import * as _ from "lodash";
import { Webthing } from "./webthing.model";
import { User } from "./user.model";

export namespace AlexaGlobal {

    export enum DirectivePayloadVersion {
        VERSION3 = '3',
    }

    export enum DirectiveHeaderNames {
        DISCOVER = 'Discover',
        DISCOVER_RESPONSE = 'Discover.Response',
        REPORTSTATE = 'ReportState',
        STATEREPORT = 'StateReport',
        RESPONSE = 'Response',
        TURN_ON = 'TurnOn',
        TURN_OFF = 'TurnOff',
    }

    export enum Interfaces {
        ALEXA = 'Alexa',
        ALEXA_DISCOVERY = 'Alexa.Discovery',
        ALEXA_TEMPERATURE_SENSOR = 'Alexa.TemperatureSensor',
        ALEXA_POWER_CONTROLLER = 'Alexa.PowerController',
    }

    export function InterfaceValue(alexaInterface: Interfaces, value: any):any {
        switch (alexaInterface) {
            case Interfaces.ALEXA_POWER_CONTROLLER:
                return (value === DirectiveHeaderNames.TURN_ON) ? true : false;
            case Interfaces.ALEXA_TEMPERATURE_SENSOR:
                return Number(value);        
            default:
                return false;
        }
    }

    export enum DisplayCategories {
        ACTIVITY_TRIGGER = 'ACTIVITY_TRIGGER',
        CAMERA = 'CAMERA',
        COMPUTER = 'COMPUTER',
        CONTACT_SENSOR = 'CONTACT_SENSOR',
        DOOR = 'DOOR',
        DOORBELL = 'DOORBELL',
        EXTERIOR_BLIND = 'EXTERIOR_BLIND',
        FAN = 'FAN',
        GAME_CONSOLE = 'GAME_CONSOLE',
        GARAGE_DOOR = 'GARAGE_DOOR',
        INTERIOR_BLIND = 'INTERIOR_BLIND',
        LAPTOP = 'LAPTOP',
        LIGHT = 'LIGHT',
        MICROWAVE = 'MICROWAVE',
        MOBILE_PHONE = 'MOBILE_PHONE',
        MOTION_SENSOR = 'MOTION_SENSOR',
        MUSIC_SYSTEM = 'MUSIC_SYSTEM',
        NETWORK_HARDWARE = 'NETWORK_HARDWARE',
        OTHER = 'OTHER',
        OVEN = 'OVEN',
        PHONE = 'PHONE',
        SCENE_TRIGGER = 'SCENE_TRIGGER',
        SCREEN = 'SCREEN',
        SECURITY_PANEL = 'SECURITY_PANEL',
        SMARTLOCK = 'SMARTLOCK',
        SMARTPLUG = 'SMARTPLUG',
        SPEAKER = 'SPEAKER',
        STREAMING_DEVICE = 'STREAMING_DEVICE',
        SWITCH = 'SWITCH',
        TABLET = 'TABLET',
        TEMPERATURE_SENSOR = 'TEMPERATURE_SENSOR',
        THERMOSTAT = 'THERMOSTAT',
        TV = 'TV',
        WEARABLE = 'WEARABLE',
    }

    /**
     * Capability Property Schemas
     * 
     * Many properties can be expressed as either a string or an object
     * 
     * Each capability / interface like 'Alexa.TemperatureSensor' has  one or multiple properties
     * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-property-schemas.html
     *
     * @export
     * @enum {string}
     */
    export enum CapabilityProperty {
        TEMPERATUE = 'temperature',
        POWER_STATE = 'powerState',
    }


    export interface PropertySupported {
        name: string;
    }

    /**
     * The properties of the interface that your skill supports
     *
     * @export
     * @interface Properties
     */
    export interface Properties {
        /**
         * The properties of the interface that your skill supports
         *
         * @type {Supported[]}
         * @memberof Properties
         */
        supported: PropertySupported[];

        /**
         * True if your skill sends change reports when the properties change. The default is false.
         * (https://developer.amazon.com/en-US/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html)[https://developer.amazon.com/en-US/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html]
         * 
         * @type {boolean}
         * @memberof Properties
         */
        proactivelyReported: boolean;
        
        /**
         * True if your skill sends change reports when the properties change. The default is false.
         * (https://developer.amazon.com/en-US/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html)[https://developer.amazon.com/en-US/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html]
         *
         * @type {boolean}
         * @memberof Properties
         */
        retrievable: boolean;
    }

    export interface Cookie { [key: string]: string; }
}

export module AlexaDiscoveryInterface {

    export enum AlexaCapabilityInterfaceType {
        ALEXA_INTERFACE = 'AlexaInterface',
    }

    export interface CapabilityResources {
    }

    export interface Configuration {
    }

    export interface Semantics {
    }

    /**
     * The capability interfaces that your skill supports for the endpoint, such as Alexa.BrightnessController or Alexa.PowerController
     *
     * A capability object represents an interface that your skill supports. For example, your skill might support turning on a light by supporting the Alexa.PowerController interface. To find available interfaces for smart home devices, see (List of Capability Interfaces and Supported Locales)[https://developer.amazon.com/en-US/docs/alexa/device-apis/list-of-interfaces.html].
     * 
     * Discovery:
     * You should explicitly include the Alexa interface in the Discover.Response
     * 
     * (https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-interface.html)[https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-interface.html]
     * (https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#capability-object)[https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#capability-object]
     *      
     * @export
     * @interface AlexaCapabilityInterface
     */
    export interface AlexaCapabilityInterface {
        type: AlexaCapabilityInterfaceType;
        /**
         * The name of the capability interface.
         * 
         * The Alexa interface is the top-level interface for Alexa skills. For the full list of Alexa capability interfaces, see List of Capability Interfaces and Supported Locales. https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html
         * 
         * The Alexa interface contains general Alexa directives, response events, discovery, state reporting, change reporting, and error reporting. For more information, see Capability Interface Message Guide. https://developer.amazon.com/en-US/docs/alexa/device-apis/list-of-interfaces.html
         * 
         * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-interface.html
         *
         * @type {string}
         * @memberof AlexaCapabilityInterface
         */
        interface: AlexaGlobal.Interfaces;
        instance?: string;
        version: AlexaGlobal.DirectivePayloadVersion
        properties?: AlexaGlobal.Properties;
        capabilityResources?: CapabilityResources;
        configuration?: Configuration;
        semantics?: Semantics;
        cookie?: Object
    }

    export interface AlexaCapabilityList {
        capabilities: AlexaCapabilityInterface[];
    }

    export class AlexaCapabilities implements AlexaCapabilityList{
        capabilities: AlexaCapabilityInterface[];
        constructor(){
            this.capabilities = [];
            const defaultAlexaInterface: AlexaCapabilityInterface = {
                type: AlexaCapabilityInterfaceType.ALEXA_INTERFACE,
                interface: AlexaGlobal.Interfaces.ALEXA,
                version: AlexaGlobal.DirectivePayloadVersion.VERSION3
            }
            this.capabilities.push(defaultAlexaInterface);
        }
    }


    /**
     * Creates a default Alexa Capability Object with the interface 'Alexa.'
     * 
     * @export
     * @class AlexaCapability
     * @implements {AlexaCapabilityInterface}
     */
    export class AlexaCapability implements AlexaCapabilityInterface {

        type: AlexaCapabilityInterfaceType;
        interface: AlexaGlobal.Interfaces;
        instance: string;
        version: AlexaGlobal.DirectivePayloadVersion;
        properties?: AlexaGlobal.Properties | undefined;
        capabilityResources?: AlexaDiscoveryInterface.CapabilityResources | undefined;
        configuration?: AlexaDiscoveryInterface.Configuration | undefined;
        semantics?: AlexaDiscoveryInterface.Semantics | undefined;
        cookie?: Object | undefined;

        constructor() {
            this.type = AlexaCapabilityInterfaceType.ALEXA_INTERFACE;
            this.interface = AlexaGlobal.Interfaces.ALEXA;
            this.instance = process.env.ALEXACAPABILITYINSTANCE;
            this.version = AlexaGlobal.DirectivePayloadVersion.VERSION3;
            // this.cookie = {};
        }

    }


    export interface AdditionalAttributes {
    }

    export interface Relationships {
    }


    /**
     * The endpoint object represents a connected device or component associated with a user's device cloud account. An endpoint describes one of the following:
     * - A physical device
     * - A virtual device
     * - A group or cluster of devices
     * - A software component
     * 
     * [https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html)
     * 
     * Endpoint object example
     * ```json
     * {
     *   "endpointId": "<unique ID of the endpoint>",
     *   "manufacturerName": "Sample Manufacturer",
     *   "description": "Smart Light by Sample Manufacturer",
     *   "friendlyName": "Living Room Light",
     *   "displayCategories": ["LIGHT"],
     *   "additionalAttributes":  {
     *   },
     *   "capabilities": [
     *   ],
     *   "connections": [
     *   ],
     *   "relationships": {
     *   },
     *   "cookie": {
     *     "extraDetail1": "information used by your skill",
     *     "extraDetail2": "you can have multiple entries",
     *     "extraDetail3": "don't save device state here"
     *   }
     * }
     * ```
     *
     * @export
     * @interface AlexaEndpointObject
     */
    export interface AlexaEndpointObject {
        endpointId: string;
        manufacturerName: string;
        description: string;
        friendlyName: string;
        displayCategories: AlexaGlobal.DisplayCategories[];
        additionalAttributes: AdditionalAttributes;
        capabilities: AlexaCapabilityInterface[];
        connections: any[];
        relationships: Relationships;
        cookie: Object;
    }

    export class AlexaThings {
    
        alexaEndpoints: Array<AlexaDiscoveryInterface.AlexaEndpointObject>;
    
        constructor(things: ReadonlyArray<Webthing.Thing>) {
            this.alexaEndpoints = [];
    
            for (let index = 0; index < things.length; index++) {
                const thing = things[index];
                if (!_.has(thing, 'id')) continue;
                let alexaEndpoint = {} as AlexaDiscoveryInterface.AlexaEndpointObject;
                alexaEndpoint.endpointId = this.getThingId(thing.id);
    
                // manufacturerName
                if (!_.isUndefined(process.env.ALEXAENDPOINTMANUFACTURERNAME)) {
                    alexaEndpoint.manufacturerName = process.env.ALEXAENDPOINTMANUFACTURERNAME;
                }
    
    
                // friendlyName
                if (_.has(thing, 'title')) alexaEndpoint.friendlyName = (!_.isUndefined(process.env.ALEXAENDPOINTFRIENDLYNAME) ? process.env.ALEXAENDPOINTFRIENDLYNAME : "") + thing['title'].substring(0, 127);
    
                // description
                if (_.has(thing, 'description') && thing.description.length > 0) {
                    alexaEndpoint.description = (!_.isUndefined(process.env.ALEXAENDPOINTDESCRIPTION) ? process.env.ALEXAENDPOINTDESCRIPTION : "") + thing['description'].substring(0, 127);
                }
                else {
                    alexaEndpoint.description = alexaEndpoint.friendlyName;
                }
    
                // displayCategories
                // TODO: Better handle of missing display categories
                alexaEndpoint.displayCategories = this.getAlexaDisplayCategories(thing);
                if (alexaEndpoint.displayCategories.length === 0) continue;
    
                // capabilities
                // TODO: Better handle of missing capabilities
                alexaEndpoint.capabilities = this.getAlexaCapabilities(thing, alexaEndpoint.displayCategories);
                if (alexaEndpoint.capabilities.length === 0) continue;
    
                // cookie
                alexaEndpoint.cookie = {};
                for (let index = 0; index < alexaEndpoint.capabilities.length; index++) {
                    const alexaCapability = alexaEndpoint.capabilities[index];
                    if (!_.has(alexaCapability, 'instance')) continue;
                    if (!_.has(alexaCapability, 'interface')) continue;
                    alexaEndpoint.cookie[`${alexaCapability.instance}`] = alexaCapability.interface;
                }
    
                //
    
                this.alexaEndpoints.push(alexaEndpoint);
            }
        }
    
        getThingId(id: string): string {
            // The identifier for the endpoint. The identifier must be unique across all devices for the skill. The identifier must be consistent for all discovery requests for the same device. An identifier can contain letters or numbers, spaces, and the following special characters: _ - = # ; : ? @ &. The identifier can't exceed 256 characters.
            return id.replace(`${process.env.WEBTHINGSERVERURL}/things/`, '').substring(0, 255)
        }
    
        private getAlexaDisplayCategories(thing: Webthing.Thing): Array<AlexaGlobal.DisplayCategories> {
            let alexaDiplayCategories: Array<AlexaGlobal.DisplayCategories> = [];
    
            if (!_.has(thing, '@type')) return alexaDiplayCategories;
    
            for (let index = 0; index < thing['@type'].length; index++) {
                const type = thing['@type'][index];
    
                switch (type) {
                    case 'TemperatureSensor':
                        // https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-temperaturesensor.html
                        alexaDiplayCategories = this.pushToAlexaCategories(alexaDiplayCategories, AlexaGlobal.DisplayCategories.TEMPERATURE_SENSOR);
                        break;
                    case 'SmartPlug':
                        alexaDiplayCategories = this.pushToAlexaCategories(alexaDiplayCategories, AlexaGlobal.DisplayCategories.SMARTPLUG);
                        break;
                    case 'OnOffSwitch':
                        alexaDiplayCategories = this.pushToAlexaCategories(alexaDiplayCategories, AlexaGlobal.DisplayCategories.SMARTPLUG);
                        break;
                }
            }
    
            return alexaDiplayCategories;
        }
    
        private pushToAlexaCategories(alexaDiplayCategories: Array<AlexaGlobal.DisplayCategories>, category: AlexaGlobal.DisplayCategories): Array<AlexaGlobal.DisplayCategories> {
            if (!alexaDiplayCategories.includes(category)) alexaDiplayCategories.push(category);
            return alexaDiplayCategories;
        }
    
        /**
         * Get Alexa Capabilities with (default) interfaces as a list
         *
         * @private
         * @param {Webthing.Thing} thing
         * @param {Array<AlexaGlobal.DisplayCategories>} alexaDiplayCategories
         * @returns {Array<AlexaDiscoveryInterface.AlexaCapabilityInterface>}
         * @memberof AlexaThings
         */
        private getAlexaCapabilities(thing: Webthing.Thing, alexaDiplayCategories: Array<AlexaGlobal.DisplayCategories>): Array<AlexaDiscoveryInterface.AlexaCapabilityInterface> {
            // Instantiate the list for Alexa Capability Interfaces with the default interface as described (https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-interface.html)
            // You should explicitly include the Alexa interface in the Discover.Response
            const alexaInterfaces = new AlexaDiscoveryInterface.AlexaCapabilities();
    
            for (let index = 0; index < alexaDiplayCategories.length; index++) {
                const alexaDiplayCategory: AlexaGlobal.DisplayCategories = alexaDiplayCategories[index];
    
                const alexaInterface = this.getAlexaInterfaceForAlexaDisplayCategory(alexaDiplayCategory);
                if (alexaInterface === null) continue;
    
                const alexaCapabilityProperty = this.getAlexaCapabilityPropertyForAlexaInterface(alexaInterface);;
                if (alexaCapabilityProperty === null) continue;
    
                const webthingPropertyName = this.getWebthingPropertyNameForAlexaDisplayCategory(alexaDiplayCategory);
                if (webthingPropertyName === null) continue;
    
    
                const properties = this.getThingPropertiesForType(thing, webthingPropertyName, alexaInterface);
    
                let alexaCapability = new AlexaDiscoveryInterface.AlexaCapability();
                alexaCapability.interface = alexaInterface;
                alexaCapability.instance = properties[0].key!;
                alexaCapability.properties = {
                    supported: [
                        {
                            name: alexaCapabilityProperty
                        }
                    ],
                    proactivelyReported: false,
                    retrievable: true
                };
                // TODO: Set only one parameter like: cookie[`${alexaInterface}`] = properties[0].key;
                // alexaCapability.cookie = properties[0];
    
                alexaInterfaces.capabilities.push(alexaCapability);
            }
    
            return alexaInterfaces.capabilities;
    
        }
    
        private getAlexaCapabilityPropertyForAlexaInterface(alexaInteface: AlexaGlobal.Interfaces): AlexaGlobal.CapabilityProperty | null {
            switch (alexaInteface) {
                case AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR:
                    return AlexaGlobal.CapabilityProperty.TEMPERATUE;
                case AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER:
                    return AlexaGlobal.CapabilityProperty.POWER_STATE;
                default:
                    return null;;
            }
        }
    
        private getAlexaInterfaceForAlexaDisplayCategory(alexaDiplayCategory: AlexaGlobal.DisplayCategories): AlexaGlobal.Interfaces | null {
            switch (alexaDiplayCategory) {
                case AlexaGlobal.DisplayCategories.TEMPERATURE_SENSOR:
                    return AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR;
                case AlexaGlobal.DisplayCategories.SMARTPLUG:
                    return AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER;
                default:
                    return null;
            }
        }
    
        private getWebthingPropertyNameForAlexaDisplayCategory(alexaDiplayCategory: AlexaGlobal.DisplayCategories): Webthing.PropertyType | null {
            switch (alexaDiplayCategory) {
                case AlexaGlobal.DisplayCategories.TEMPERATURE_SENSOR:
                    return Webthing.PropertyType.TemperatureProperty;
                case AlexaGlobal.DisplayCategories.SMARTPLUG:
                    return Webthing.PropertyType.OnOffProperty;
                default:
                    return null;
            }
        }
    
        /**
         * @param  {Webthing.Thing} thing
         *                          The webthing
         * @param  {Webthing.PropertyType} propertyType
         *                  The type of property['type'] like 'TemperatureProperty', 'OnOffProperty'
         * @param  {AlexaGlobal.Interfaces} alexaInterface
         *                  The Alexa interface type like 'Alexa.TemperatureSensor', 'Alexa.PowerController'; it's added to the property for later reference
         * @return {Array<Webthing.Property>} properties
         *                          List of property objects
         */
        private getThingPropertiesForType(thing: Webthing.Thing, propertyType: Webthing.PropertyType, alexaInterface: AlexaGlobal.Interfaces): Array<Webthing.Property> {
            const props: Array<Webthing.Property> = [];
            for (const key in thing.properties) {
                const property: Webthing.Property = thing.properties[key];
                if (!_.has(property, '@type')) continue;
                if (property['@type'] !== propertyType) continue;
                property.key = key;
                property.alexaInterface = alexaInterface;
                props.push(property);
            }
            return props;
        }
    }

}

/*
* Alexa.Response Interface
* When you handle an Alexa directive successfully, respond with a response event. The most generic response event is Alexa.Response. Some directives have more specific response events, for example, an Add directive might have an AddResponse response event. Check the documentation for your specific interface and directive to determine the correct response event to use.
* If you can't handle a directive successfully, respond with an (Alexa.ErrorResponse event)[https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-errorresponse.html] instead.
* 
* (https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-response.html#synchronous)[https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-response.html#synchronous]
* 
* @export
* @namespace AlexaResponseInterface
*/
export namespace AlexaResponseInterface {

    export interface PropertyInterface {
        namespace: AlexaGlobal.Interfaces;
        name: AlexaGlobal.CapabilityProperty | null;
        value: string | object | null;
        timeOfSample: string;
        uncertaintyInMilliseconds: number;
    }

    export class Property implements PropertyInterface {
        namespace: AlexaGlobal.Interfaces;
        name: AlexaGlobal.CapabilityProperty | null;
        value: string | object | null;
        timeOfSample: string;
        uncertaintyInMilliseconds: number;

        constructor(namespace: AlexaGlobal.Interfaces, value: string | number | boolean, uncertaintyInMilliseconds: number) {
            this.namespace = namespace;
            this.name = null;
            this.value = null;

            switch (namespace) {
                case AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR:
                    this.name = AlexaGlobal.CapabilityProperty.TEMPERATUE;
                    this.value = {
                        value: Number(value),
                        scale: "CELSIUS"
                    }
                    break;
                case AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER:
                    this.name = AlexaGlobal.CapabilityProperty.POWER_STATE;
                    this.value = Boolean(value) ? 'ON' : 'OFF';
                    break;
            }


            this.timeOfSample = new Date().toISOString();
            this.uncertaintyInMilliseconds = uncertaintyInMilliseconds;
        }

    }


    /*
     * directive.header
     * event.header
     */
    export interface HeaderInterface {
        namespace: AlexaGlobal.Interfaces;
        name: AlexaGlobal.DirectiveHeaderNames;
        messageId: string;
        correlationToken: string;
        readonly payloadVersion: AlexaGlobal.DirectivePayloadVersion;
    }

    /*
     * directive.endpoint
     * event.endpoint
     */
    export interface EndpointInterface {
        scope: TokenInterface;
        endpointId: string;
        cookie?: AlexaGlobal.Cookie;
    }


    /*
     * directive.payload
     * event.payload
     */
    export interface PayloadInterface {
        endpoints?: AlexaDiscoveryInterface.AlexaEndpointObject[]
        scope?: TokenInterface
    }

    /**
     * The Alexa Directive payload or endpoint token
     * directive.payload.scope
     * directive.endpoint.scope
     *
     * @export
     * @interface Token
     */
    export interface TokenInterface {
        type: string;
        token: string;
    }


    /*
     * event.context
     */
    export interface ContextInterface {
        properties: PropertyInterface[];
    }


    /*
     * Defines the payload/content/structure of the directive and event object
     * directive{}
     * event{}
     */
    export interface DirectiveEventInterface {
        header: HeaderInterface,
        endpoint?: EndpointInterface,
        payload: PayloadInterface
    }

    /*
     * Directive request
     */
    export interface DirectiveInterface {
        directive?: DirectiveEventInterface;
        user?: User.IUser;
    }

    /*
     * Alexa.Response event
     * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-response.html#synchronous
     */
    export interface ResponseInterface {
        event: DirectiveEventInterface;
        context?: ContextInterface;
    }



    export class EventResponseInterface implements ResponseInterface {

        header: HeaderInterface;
        
        event: DirectiveEventInterface;

        properties: PropertyInterface[];
        context: ContextInterface;

        constructor(event: DirectiveInterface) {
            let headerNamespace: AlexaGlobal.Interfaces = AlexaGlobal.Interfaces.ALEXA;
            let headerName:AlexaGlobal.DirectiveHeaderNames = AlexaGlobal.DirectiveHeaderNames.RESPONSE;
            switch (event.directive!.header.name) {
                case AlexaGlobal.DirectiveHeaderNames.REPORTSTATE:
                    headerName = AlexaGlobal.DirectiveHeaderNames.STATEREPORT;
                    break;
                case AlexaGlobal.DirectiveHeaderNames.DISCOVER:
                    headerNamespace = AlexaGlobal.Interfaces.ALEXA_DISCOVERY;
                    headerName = AlexaGlobal.DirectiveHeaderNames.DISCOVER_RESPONSE;
                    break;
                default:
                    break;
            }
            this.header = {
                namespace: headerNamespace,
                name: headerName,
                messageId: event.directive!.header.messageId,
                correlationToken: event.directive!.header.correlationToken,
                payloadVersion: AlexaGlobal.DirectivePayloadVersion.VERSION3
            };

            this.event = {
                header: this.header,
                payload: {}
            }
            if(_.has(event.directive!, 'endpoint')) this.event['endpoint'] = event.directive!.endpoint!;

            this.properties = [];
            this.context = {
                properties: this.properties
            }

        }

        addEventPayloadEventsEndpoint(endpoints: AlexaDiscoveryInterface.AlexaEndpointObject[]):void {
            if(!_.has(this.event.payload, 'endpoints')) {
                this.event.payload = {
                    endpoints: []
                }
            }
            this.event.payload.endpoints! = [...endpoints];
        }

        getDiscoverResponse(): ResponseInterface {
            if(_.has(this.event, 'endpoint')) delete this.event['endpoint'];

            const response: ResponseInterface = {
                event: this.event
            }
            return response;
        }

        getStateReportDirectiveResponse(): ResponseInterface {
            if(_.hasIn(this.event, 'endpoint.cookie')) delete this.event.endpoint!['cookie'];
            const response: ResponseInterface = {
                event: this.event,
                context: this.context
            }
            return response;
        }

        /**
         * Get the response event for the Alexa directives like 'TurnOn', 'TurnOff', etc.
         * The body.header.messageId must include a '-R' at the end
         * (Seen here: https://developer.amazon.com/de-DE/docs/alexa/smarthome/steps-to-build-a-smart-home-skill.html)
         *
         * @returns {ResponseInterface}
         * @memberof EventResponseInterface
         */
        getDirectiveResponse(): ResponseInterface {
            if(_.has(this.header, 'messageId')) this.header.messageId += '-R'; 
            const response: ResponseInterface = {
                event: this.event,
                context: this.context
            }
            return response;
        }


        getResponse(): ResponseInterface {
            const response: ResponseInterface = {
                event: this.event,
                context: this.context
            }
            return response;
        }

    }
}