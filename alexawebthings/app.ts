import * as _ from "lodash";
// Import type definition for AWS Lambda
import * as AWSLambda from 'aws-lambda';
import {AWSLambdaAlexaResult} from './interfaces/aws.interfaces';

import { log, LogType } from './utils/log.utils';
import { AlexaGlobal, AlexaResponseInterface } from './models/alexa.model';
import { handleThingsRequest, handleThingPropertyRequest, handleThingPropertyPut} from './services/webthings.service';
import { User } from "./models/user.model";


/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {string} event.resource - Resource path.
 * @param {string} event.path - Path parameter.
 * @param {string} event.httpMethod - Incoming request's method name.
 * @param {Object} event.headers - Incoming request headers.
 * @param {Object} event.queryStringParameters - query string parameters.
 * @param {Object} event.pathParameters - path parameters.
 * @param {Object} event.stageVariables - Applicable stage variables.
 * @param {Object} event.requestContext - Request context, including authorizer-returned key-value pairs, requestId, sourceIp, etc.
 * @param {Object} event.body - A JSON string of the request payload.
 * @param {boolean} event.body.isBase64Encoded - A boolean flag to indicate if the applicable request payload is Base64-encode
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 * @param {string} context.logGroupName - Cloudwatch Log Group name
 * @param {string} context.logStreamName - Cloudwatch Log stream name.
 * @param {string} context.functionName - Lambda function name.
 * @param {string} context.memoryLimitInMB - Function memory.
 * @param {string} context.functionVersion - Function version identifier.
 * @param {function} context.getRemainingTimeInMillis - Time in milliseconds before function times out.
 * @param {string} context.awsRequestId - Lambda request ID.
 * @param {string} context.invokedFunctionArn - Function ARN.
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * @returns {boolean} object.isBase64Encoded - A boolean flag to indicate if the applicable payload is Base64-encode (binary support)
 * @returns {string} object.statusCode - HTTP Status Code to be returned to the client
 * @returns {Object} object.headers - HTTP Headers to be returned
 * @returns {Object} object.body - JSON Payload to be returned
 * 
 */
export async function lambdaApiHandler(event:AWSLambda.APIGatewayEvent, context:AWSLambda.Context):Promise<AWSLambda.APIGatewayProxyResult|AWSLambdaAlexaResult> {

    log(LogType.DEBUG,'Lamda API Handler', 'event', event);

    if(event.httpMethod === 'OPTIONS') {
        log(LogType.DEBUG,'HTTP Method OPTIONS')
        const response:AWSLambda.APIGatewayProxyResult = {
            'statusCode': 200,
            headers: {
                "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                "X-Requested-With": "*"
            },
            'body': 'Hello World'
        }
        log(LogType.DEBUG,'SendResponse', 'apiResponse', response);
        return response;
    }

    let body: AlexaResponseInterface.DirectiveInterface = {};
    try {
        body = await JSON.parse(event.body!);
        body.user = await getUserFromAlexaPayloadScopeToken(body);
    } catch (e) {
        log(LogType.ERROR,'lambdaApiHandler', 'error', e);
        return APIGatewayProxyResultError(e);
    }
    
    if (_.hasIn(body, 'directive.header.namespace') && _.hasIn(body, 'directive.header.name')) {
        if (body.directive!.header.namespace === 'Alexa.Discovery' && body.directive!.header.name === 'Discover') {
            return AlexaDiscoverDirective(body, context);
        }
        if (body.directive!.header.namespace === 'Alexa' && body.directive!.header.name === 'ReportState') {
            return AlexaReportStateDirective(body, context);
        }
        if (body.directive!.header.namespace === 'Alexa.PowerController') {
            return AlexaPowerControllerDirective(body, context);
        }
    }

    return APIGatewayProxyResultDefault();
    
};

export async function lambdaAlexaHandler(event:AlexaResponseInterface.DirectiveInterface, context:AWSLambda.Context):Promise<AWSLambda.APIGatewayProxyResult|AWSLambdaAlexaResult> {

    log(LogType.DEBUG,'Lamda Alexa Handler', 'event', event);

    try {
        event.user = await getUserFromAlexaPayloadScopeToken(event);
    } catch (e) {
        log(LogType.DEBUG,'lambdaAlexaHandler', 'error', e);
        return APIGatewayProxyResultError(e);
    }


    if (_.hasIn(event, 'directive.header.namespace') && _.hasIn(event, 'directive.header.name')) {
        
        log(LogType.DEBUG,event.directive!.header.namespace, event.directive!.header.name);

        if (event.directive!.header.namespace === AlexaGlobal.Interfaces.ALEXA_DISCOVERY && event.directive!.header.name === AlexaGlobal.DirectiveHeaderNames.DISCOVER) { 
            // Add count
            User.addCount(event.user!, User.IFAlexaCounter.Discovery);
            // Return          
            return AlexaDiscoverDirective(event, context, true);
        }
        
        /** ReportState directive
         * Alexa sends a ReportState directive to request information about the state of an endpoint.
         * (Example: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-powercontroller.html#state-report)
         */
        if (event.directive!.header.namespace === AlexaGlobal.Interfaces.ALEXA && event.directive!.header.name === AlexaGlobal.DirectiveHeaderNames.REPORTSTATE) {
            // Add count
            User.addCount(event.user!, User.IFAlexaCounter.ReportState);
            // Return
            return AlexaReportStateDirective(event, context, true);
        }

        /** Alexa.PowerController Directive TurnOn / TurnOff
         *  https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-powercontroller.html#directives
         */
         
        if (event.directive!.header.namespace === AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER) {
            // Add count
            User.addCount(event.user!, User.IFAlexaCounter.PowerController);
            // Return
            return AlexaPowerControllerDirective(event, context, true);
        }
    }

    return APIGatewayProxyResultDefault();

};
/**
 * Get the user object from the Alexa Request Directive Payload Scope Token
 * @param  {AlexaResponseInterface.DirectiveInterface} event - The lamda event which is the Alexa Directive
 * @returns {Promise<User.User>} user - The user object
 */
async function getUserFromAlexaPayloadScopeToken(event:AlexaResponseInterface.DirectiveInterface):Promise<User.User> {
    // Check that token exists (the token is from the user's authorization server and sent by Alexa Smart Home Skill to the Lambda function)
    // Could be either in the payload for 'AlexaDiscovery.Discover' or 'endpoint for directives like 'Alexa.PowerController.TurnOn', 'Alexa.ReportState', etc.
    let token: string|undefined = undefined;
    if(_.hasIn(event, 'directive.payload.scope.token')) token = event.directive!.payload.scope!.token; // Directive 'Alexa.Discovery.Discover'
    if(_.hasIn(event, 'directive.endpoint.scope.token')) token = event.directive!.endpoint!.scope.token; // Directive like 'Alexa.PowerController.TurnOn', 'Alexa.ReportState', etc.

    if(!token) throw new Error('No event.directive.payload.scope.token or event.directive.endpoint.scope.token exist.');

    try {
        const user = new User.User(token as string);
        return user.getUserInformation();;
        // const jwt = new JWT.JWT(token as string);
        // if(!jwt.hasWebthings(JWT.JWTWerbthingsConstants.WebthingsURL)) throw new Error('JWT.webthingsURL does not exist.')
        // if(!jwt.hasWebthings(JWT.JWTWerbthingsConstants.WebthingsJWT)) throw new Error('JWT.webthingsJWT does not exist.')
        // return jwt;
    } catch (err) {
        log(LogType.ERROR,'getUserFromAlexaPayloadScopeToken', 'error', err);
        return err;
    }
}




async function AlexaDiscoverDirective(event:AlexaResponseInterface.DirectiveInterface, context:AWSLambda.Context, alexaResponse:boolean = false):Promise<AWSLambda.APIGatewayProxyResult|AWSLambdaAlexaResult> {

    return handleThingsRequest(event.user!)
        .then(webthings => {
            const alexaResult = new AlexaResponseInterface.EventResponseInterface(event);
            alexaResult.addEventPayloadEventsEndpoint(webthings.alexaEndpoints);
            return SendResponse(alexaResult.getDiscoverResponse(), alexaResponse);
        })
        .catch(err => {
            log(LogType.ERROR,'AlexaDiscoverDirective', 'handleThingsRequest', 'error', err)
            return APIGatewayProxyResultError(err);
        })
}

async function AlexaReportStateDirective(event:AlexaResponseInterface.DirectiveInterface, context:AWSLambda.Context, alexaResponse:boolean = false):Promise<AWSLambda.APIGatewayProxyResult|AWSLambdaAlexaResult> {

    // ReportState directive
    // https://developer.amazon.com/en-US/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html#report-state-when-alexa-requests-it

    if (!_.hasIn(event, 'directive.endpoint.endpointId')) return APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter endpointId.')
    if (!_.hasIn(event, 'directive.endpoint.cookie')) return APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter cookie.')

    const webthingEndpointID = event.directive!.endpoint!.endpointId;
    const cookie = event.directive!.endpoint!.cookie as AlexaGlobal.Cookie;
    return handleThingPropertyRequest(event.user!, webthingEndpointID)
        .then(properties => {

            const alexaResult = new AlexaResponseInterface.EventResponseInterface(event);

            for (let [key, value] of Object.entries(properties)) {
                // The Alexa endpoint does not have a capability for the property/value
                if (!_.has(cookie, key)) continue;
                // The Alexa endpoint does have the capability for the property/value
                const alexaReportStateProperty = new AlexaResponseInterface.Property(cookie[`${key}`] as AlexaGlobal.Interfaces, value, 500);
                if(alexaReportStateProperty.name === null || alexaReportStateProperty.value === null) continue;
                alexaResult.properties.push(alexaReportStateProperty);
            }

            return SendResponse(alexaResult.getStateReportDirectiveResponse(), alexaResponse);
        })
        .catch(err => {
            log(LogType.ERROR,'AlexaReportStateDirective', 'handleThingPropertyRequest', 'error', err)
            return APIGatewayProxyResultError(err);
        })
}

async function AlexaPowerControllerDirective(event:AlexaResponseInterface.DirectiveInterface, context:AWSLambda.Context, alexaResponse:boolean = false):Promise<AWSLambda.APIGatewayProxyResult|AWSLambdaAlexaResult> {

    // Alexa.PowerController directive
    // https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-powercontroller.html#directives

    if (!_.hasIn(event, 'directive.endpoint.endpointId')) return APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter endpointId.')
    if (!_.hasIn(event, 'directive.endpoint.cookie')) return APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter cookie.')


    for (let [alexaInstance, alexaInterface] of Object.entries(event.directive!.endpoint!.cookie!)) {
        // Identify the cookie/property with the correct interface ('Alexa.PowerController') for the 'Alexa.PowerController directive'
        if(alexaInterface !== AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER) continue;
        // TODO: The propertyValue must be identifed by the AlexaGlobal.Interface to be more generic
        const propertyValue: any = AlexaGlobal.InterfaceValue(AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER, event.directive!.header.name);
        return handleThingPropertyPut(event.user!, event.directive!.endpoint!.endpointId, alexaInstance, propertyValue)
                .then(properties => {
                    const alexaResult = new AlexaResponseInterface.EventResponseInterface(event);
                    
                    for (let [propertKey, propertyValue] of Object.entries(properties)) {
                        const alexaReportStateProperty = new AlexaResponseInterface.Property(AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER, propertyValue, 500)
                        alexaResult.properties.push(alexaReportStateProperty);
                    }
        
                    return SendResponse(alexaResult.getStateReportDirectiveResponse(), alexaResponse);
                })
                .catch(err => {
                    log(LogType.ERROR,'AlexaPowerControllerDirective', 'handleThingPropertyPut', 'error', err)
                    return APIGatewayProxyResultError(err);
                })
    }

    return APIGatewayProxyResultDefault();

}

async function APIGatewayProxyResultDefault():Promise<AWSLambda.APIGatewayProxyResult> {
    const response:AWSLambda.APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({message: 'Nothing to see!'})
    }
    return response;
}

async function APIGatewayProxyResultError(message: Error|string):Promise<AWSLambda.APIGatewayProxyResult> {
    const response:AWSLambda.APIGatewayProxyResult = {
        'statusCode': 200,
        'body': JSON.stringify({error: (message instanceof Error) ? message.message : message})
    }
    return response;
}


async function SendResponse(result: AlexaResponseInterface.ResponseInterface, alexaResponse:boolean = false):Promise<AWSLambda.APIGatewayProxyResult|AWSLambdaAlexaResult> {
    
    const body: string = JSON.stringify(result);
    
    if(alexaResponse) {
        log(LogType.DEBUG,'SendResponse', 'alexaResponse', body);
        return result;
    }
    
    const response:AWSLambda.APIGatewayProxyResult = {
        'statusCode': 200,
        headers: {
            "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "X-Requested-With": "*"
        },
        'body': body
    }
    log(LogType.DEBUG,'SendResponse', 'apiResponse', response);
    return response;
}