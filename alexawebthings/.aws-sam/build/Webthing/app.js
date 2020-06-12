"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var log_utils_1 = require("./utils/log.utils");
var alexa_model_1 = require("./models/alexa.model");
var webthings_service_1 = require("./services/webthings.service");
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
function lambdaApiHandler(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            log_utils_1.log("Lamda API Handler", "event", event);
            body = {};
            try {
                body = JSON.parse(event.body);
            }
            catch (e) {
                log_utils_1.log(e);
            }
            if (_.hasIn(body, 'directive.header.namespace') && _.hasIn(body, 'directive.header.name')) {
                if (body.directive.header.namespace === 'Alexa.Discovery' && body.directive.header.name === 'Discover') {
                    return [2 /*return*/, AlexaDiscoverDirective(body, context)];
                }
                if (body.directive.header.namespace === 'Alexa' && body.directive.header.name === 'ReportState') {
                    return [2 /*return*/, AlexaReportStateDirective(body, context)];
                }
                if (body.directive.header.namespace === 'Alexa.PowerController') {
                    return [2 /*return*/, AlexaPowerControllerDirective(body, context)];
                }
            }
            return [2 /*return*/, APIGatewayProxyResultDefault()];
        });
    });
}
exports.lambdaApiHandler = lambdaApiHandler;
;
function lambdaAlexaHandler(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            log_utils_1.log("Lamda Alexa Handler", "event", event);
            if (_.hasIn(event, 'directive.header.namespace') && _.hasIn(event, 'directive.header.name')) {
                log_utils_1.log(event.directive.header.namespace, event.directive.header.name);
                if (event.directive.header.namespace === alexa_model_1.AlexaGlobal.Interfaces.ALEXA_DISCOVERY && event.directive.header.name === alexa_model_1.AlexaGlobal.DirectiveHeaderNames.DISCOVER) {
                    return [2 /*return*/, AlexaDiscoverDirective(event, context, true)];
                }
                /** ReportState directive
                 * Alexa sends a ReportState directive to request information about the state of an endpoint.
                 * (Example: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-powercontroller.html#state-report)
                 */
                if (event.directive.header.namespace === alexa_model_1.AlexaGlobal.Interfaces.ALEXA && event.directive.header.name === alexa_model_1.AlexaGlobal.DirectiveHeaderNames.REPORTSTATE) {
                    return [2 /*return*/, AlexaReportStateDirective(event, context, true)];
                }
                /** Alexa.PowerController Directive TurnOn / TurnOff
                 *  https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-powercontroller.html#directives
                 */
                if (event.directive.header.namespace === alexa_model_1.AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER) {
                    return [2 /*return*/, AlexaPowerControllerDirective(event, context, true)];
                }
            }
            return [2 /*return*/, APIGatewayProxyResultDefault()];
        });
    });
}
exports.lambdaAlexaHandler = lambdaAlexaHandler;
;
function AlexaDiscoverDirective(event, context, alexaResponse) {
    if (alexaResponse === void 0) { alexaResponse = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, webthings_service_1.handleThingsRequest()
                    .then(function (webthings) {
                    var alexaResult = new alexa_model_1.AlexaResponseInterface.EventResponseInterface(event);
                    alexaResult.addEventPayloadEventsEndpoint(webthings.alexaEndpoints);
                    return SendResponse(alexaResult.getDiscoverResponse(), alexaResponse);
                })
                    .catch(function (err) {
                    log_utils_1.log('AlexaDiscoverDirective', 'handleThingsRequest', 'error', err);
                    return APIGatewayProxyResultError(err);
                })];
        });
    });
}
function AlexaReportStateDirective(event, context, alexaResponse) {
    if (alexaResponse === void 0) { alexaResponse = false; }
    return __awaiter(this, void 0, void 0, function () {
        var webthingEndpointID, cookie;
        return __generator(this, function (_a) {
            // ReportState directive
            // https://developer.amazon.com/en-US/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html#report-state-when-alexa-requests-it
            if (!_.hasIn(event, 'directive.endpoint.endpointId'))
                return [2 /*return*/, APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter endpointId.')];
            if (!_.hasIn(event, 'directive.endpoint.cookie'))
                return [2 /*return*/, APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter cookie.')];
            webthingEndpointID = event.directive.endpoint.endpointId;
            cookie = event.directive.endpoint.cookie;
            return [2 /*return*/, webthings_service_1.handleThingPropertyRequest(webthingEndpointID)
                    .then(function (properties) {
                    var alexaResult = new alexa_model_1.AlexaResponseInterface.EventResponseInterface(event);
                    for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {
                        var _b = _a[_i], key = _b[0], value = _b[1];
                        // The Alexa endpoint does not have a capability for the property/value
                        if (!_.has(cookie, key))
                            continue;
                        // The Alexa endpoint does have the capability for the property/value
                        var alexaReportStateProperty = new alexa_model_1.AlexaResponseInterface.Property(cookie["" + key], value, 500);
                        if (alexaReportStateProperty.name === null || alexaReportStateProperty.value === null)
                            continue;
                        alexaResult.properties.push(alexaReportStateProperty);
                    }
                    return SendResponse(alexaResult.getStateReportDirectiveResponse(), alexaResponse);
                })
                    .catch(function (err) {
                    log_utils_1.log('AlexaReportStateDirective', 'handleThingPropertyRequest', 'error', err);
                    return APIGatewayProxyResultError(err);
                })];
        });
    });
}
function AlexaPowerControllerDirective(event, context, alexaResponse) {
    if (alexaResponse === void 0) { alexaResponse = false; }
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, _b, alexaInstance, alexaInterface, propertyValue;
        return __generator(this, function (_c) {
            // Alexa.PowerController directive
            // https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-powercontroller.html#directives
            if (!_.hasIn(event, 'directive.endpoint.endpointId'))
                return [2 /*return*/, APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter endpointId.')];
            if (!_.hasIn(event, 'directive.endpoint.cookie'))
                return [2 /*return*/, APIGatewayProxyResultError('Alexa ReportState directive does not have the parameter cookie.')];
            for (_i = 0, _a = Object.entries(event.directive.endpoint.cookie); _i < _a.length; _i++) {
                _b = _a[_i], alexaInstance = _b[0], alexaInterface = _b[1];
                // Identify the cookie/property with the correct interface ('Alexa.PowerController') for the 'Alexa.PowerController directive'
                if (alexaInterface !== alexa_model_1.AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER)
                    continue;
                propertyValue = alexa_model_1.AlexaGlobal.InterfaceValue(alexa_model_1.AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER, event.directive.header.name);
                return [2 /*return*/, webthings_service_1.handleThingPropertyPut(event.directive.endpoint.endpointId, alexaInstance, propertyValue)
                        .then(function (properties) {
                        var alexaResult = new alexa_model_1.AlexaResponseInterface.EventResponseInterface(event);
                        for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {
                            var _b = _a[_i], propertKey = _b[0], propertyValue_1 = _b[1];
                            var alexaReportStateProperty = new alexa_model_1.AlexaResponseInterface.Property(alexa_model_1.AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER, propertyValue_1, 500);
                            alexaResult.properties.push(alexaReportStateProperty);
                        }
                        return SendResponse(alexaResult.getStateReportDirectiveResponse(), alexaResponse);
                    })
                        .catch(function (err) {
                        log_utils_1.log('AlexaPowerControllerDirective', 'handleThingPropertyPut', 'error', err);
                        return APIGatewayProxyResultError(err);
                    })];
            }
            return [2 /*return*/, APIGatewayProxyResultDefault()];
        });
    });
}
function APIGatewayProxyResultDefault() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            response = {
                statusCode: 200,
                body: JSON.stringify({ message: 'Nothing to see!' })
            };
            return [2 /*return*/, response];
        });
    });
}
function APIGatewayProxyResultError(message) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            response = {
                'statusCode': 200,
                'body': JSON.stringify({ error: message })
            };
            return [2 /*return*/, response];
        });
    });
}
function SendResponse(result, alexaResponse) {
    if (alexaResponse === void 0) { alexaResponse = false; }
    return __awaiter(this, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            body = JSON.stringify(result);
            if (alexaResponse) {
                log_utils_1.log('SendResponse', 'alexaResponse', body);
                return [2 /*return*/, result];
            }
            response = {
                'statusCode': 200,
                'body': body
            };
            log_utils_1.log('SendResponse', 'apiResponse', response);
            return [2 /*return*/, response];
        });
    });
}
//# sourceMappingURL=app.js.map