"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var webthing_model_1 = require("./webthing.model");
var AlexaGlobal;
(function (AlexaGlobal) {
    var DirectivePayloadVersion;
    (function (DirectivePayloadVersion) {
        DirectivePayloadVersion["VERSION3"] = "3";
    })(DirectivePayloadVersion = AlexaGlobal.DirectivePayloadVersion || (AlexaGlobal.DirectivePayloadVersion = {}));
    var DirectiveHeaderNames;
    (function (DirectiveHeaderNames) {
        DirectiveHeaderNames["DISCOVER"] = "Discover";
        DirectiveHeaderNames["DISCOVER_RESPONSE"] = "Discover.Response";
        DirectiveHeaderNames["REPORTSTATE"] = "ReportState";
        DirectiveHeaderNames["STATEREPORT"] = "StateReport";
        DirectiveHeaderNames["RESPONSE"] = "Response";
        DirectiveHeaderNames["TURN_ON"] = "TurnOn";
        DirectiveHeaderNames["TURN_OFF"] = "TurnOff";
    })(DirectiveHeaderNames = AlexaGlobal.DirectiveHeaderNames || (AlexaGlobal.DirectiveHeaderNames = {}));
    var Interfaces;
    (function (Interfaces) {
        Interfaces["ALEXA"] = "Alexa";
        Interfaces["ALEXA_DISCOVERY"] = "Alexa.Discovery";
        Interfaces["ALEXA_TEMPERATURE_SENSOR"] = "Alexa.TemperatureSensor";
        Interfaces["ALEXA_POWER_CONTROLLER"] = "Alexa.PowerController";
    })(Interfaces = AlexaGlobal.Interfaces || (AlexaGlobal.Interfaces = {}));
    function InterfaceValue(alexaInterface, value) {
        switch (alexaInterface) {
            case Interfaces.ALEXA_POWER_CONTROLLER:
                return (value === DirectiveHeaderNames.TURN_ON) ? true : false;
            case Interfaces.ALEXA_TEMPERATURE_SENSOR:
                return Number(value);
            default:
                return false;
        }
    }
    AlexaGlobal.InterfaceValue = InterfaceValue;
    var DisplayCategories;
    (function (DisplayCategories) {
        DisplayCategories["ACTIVITY_TRIGGER"] = "ACTIVITY_TRIGGER";
        DisplayCategories["CAMERA"] = "CAMERA";
        DisplayCategories["COMPUTER"] = "COMPUTER";
        DisplayCategories["CONTACT_SENSOR"] = "CONTACT_SENSOR";
        DisplayCategories["DOOR"] = "DOOR";
        DisplayCategories["DOORBELL"] = "DOORBELL";
        DisplayCategories["EXTERIOR_BLIND"] = "EXTERIOR_BLIND";
        DisplayCategories["FAN"] = "FAN";
        DisplayCategories["GAME_CONSOLE"] = "GAME_CONSOLE";
        DisplayCategories["GARAGE_DOOR"] = "GARAGE_DOOR";
        DisplayCategories["INTERIOR_BLIND"] = "INTERIOR_BLIND";
        DisplayCategories["LAPTOP"] = "LAPTOP";
        DisplayCategories["LIGHT"] = "LIGHT";
        DisplayCategories["MICROWAVE"] = "MICROWAVE";
        DisplayCategories["MOBILE_PHONE"] = "MOBILE_PHONE";
        DisplayCategories["MOTION_SENSOR"] = "MOTION_SENSOR";
        DisplayCategories["MUSIC_SYSTEM"] = "MUSIC_SYSTEM";
        DisplayCategories["NETWORK_HARDWARE"] = "NETWORK_HARDWARE";
        DisplayCategories["OTHER"] = "OTHER";
        DisplayCategories["OVEN"] = "OVEN";
        DisplayCategories["PHONE"] = "PHONE";
        DisplayCategories["SCENE_TRIGGER"] = "SCENE_TRIGGER";
        DisplayCategories["SCREEN"] = "SCREEN";
        DisplayCategories["SECURITY_PANEL"] = "SECURITY_PANEL";
        DisplayCategories["SMARTLOCK"] = "SMARTLOCK";
        DisplayCategories["SMARTPLUG"] = "SMARTPLUG";
        DisplayCategories["SPEAKER"] = "SPEAKER";
        DisplayCategories["STREAMING_DEVICE"] = "STREAMING_DEVICE";
        DisplayCategories["SWITCH"] = "SWITCH";
        DisplayCategories["TABLET"] = "TABLET";
        DisplayCategories["TEMPERATURE_SENSOR"] = "TEMPERATURE_SENSOR";
        DisplayCategories["THERMOSTAT"] = "THERMOSTAT";
        DisplayCategories["TV"] = "TV";
        DisplayCategories["WEARABLE"] = "WEARABLE";
    })(DisplayCategories = AlexaGlobal.DisplayCategories || (AlexaGlobal.DisplayCategories = {}));
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
    var CapabilityProperty;
    (function (CapabilityProperty) {
        CapabilityProperty["TEMPERATUE"] = "temperature";
        CapabilityProperty["POWER_STATE"] = "powerState";
    })(CapabilityProperty = AlexaGlobal.CapabilityProperty || (AlexaGlobal.CapabilityProperty = {}));
})(AlexaGlobal = exports.AlexaGlobal || (exports.AlexaGlobal = {}));
var AlexaDiscoveryInterface;
(function (AlexaDiscoveryInterface) {
    var AlexaCapabilityInterfaceType;
    (function (AlexaCapabilityInterfaceType) {
        AlexaCapabilityInterfaceType["ALEXA_INTERFACE"] = "AlexaInterface";
    })(AlexaCapabilityInterfaceType = AlexaDiscoveryInterface.AlexaCapabilityInterfaceType || (AlexaDiscoveryInterface.AlexaCapabilityInterfaceType = {}));
    var AlexaCapabilities = /** @class */ (function () {
        function AlexaCapabilities() {
            this.capabilities = [];
            var defaultAlexaInterface = {
                type: AlexaCapabilityInterfaceType.ALEXA_INTERFACE,
                interface: AlexaGlobal.Interfaces.ALEXA,
                version: AlexaGlobal.DirectivePayloadVersion.VERSION3
            };
            this.capabilities.push(defaultAlexaInterface);
        }
        return AlexaCapabilities;
    }());
    AlexaDiscoveryInterface.AlexaCapabilities = AlexaCapabilities;
    /**
     * Creates a default Alexa Capability Object with the interface 'Alexa.'
     *
     * @export
     * @class AlexaCapability
     * @implements {AlexaCapabilityInterface}
     */
    var AlexaCapability = /** @class */ (function () {
        function AlexaCapability() {
            this.type = AlexaCapabilityInterfaceType.ALEXA_INTERFACE;
            this.interface = AlexaGlobal.Interfaces.ALEXA;
            this.instance = process.env.ALEXACAPABILITYINSTANCE;
            this.version = AlexaGlobal.DirectivePayloadVersion.VERSION3;
            // this.cookie = {};
        }
        return AlexaCapability;
    }());
    AlexaDiscoveryInterface.AlexaCapability = AlexaCapability;
    var AlexaThings = /** @class */ (function () {
        function AlexaThings(things) {
            this.alexaEndpoints = [];
            for (var index = 0; index < things.length; index++) {
                var thing = things[index];
                if (!_.has(thing, 'id'))
                    continue;
                var alexaEndpoint = {};
                alexaEndpoint.endpointId = this.getThingId(thing.id);
                // manufacturerName
                if (!_.isUndefined(process.env.ALEXAENDPOINTMANUFACTURERNAME)) {
                    alexaEndpoint.manufacturerName = process.env.ALEXAENDPOINTMANUFACTURERNAME;
                }
                // friendlyName
                if (_.has(thing, 'title'))
                    alexaEndpoint.friendlyName = (!_.isUndefined(process.env.ALEXAENDPOINTFRIENDLYNAME) ? process.env.ALEXAENDPOINTFRIENDLYNAME : "") + thing['title'].substring(0, 127);
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
                if (alexaEndpoint.displayCategories.length === 0)
                    continue;
                // capabilities
                // TODO: Better handle of missing capabilities
                alexaEndpoint.capabilities = this.getAlexaCapabilities(thing, alexaEndpoint.displayCategories);
                if (alexaEndpoint.capabilities.length === 0)
                    continue;
                // cookie
                alexaEndpoint.cookie = {};
                for (var index_1 = 0; index_1 < alexaEndpoint.capabilities.length; index_1++) {
                    var alexaCapability = alexaEndpoint.capabilities[index_1];
                    if (!_.has(alexaCapability, 'instance'))
                        continue;
                    if (!_.has(alexaCapability, 'interface'))
                        continue;
                    alexaEndpoint.cookie["" + alexaCapability.instance] = alexaCapability.interface;
                }
                //
                this.alexaEndpoints.push(alexaEndpoint);
            }
        }
        AlexaThings.prototype.getThingId = function (id) {
            // The identifier for the endpoint. The identifier must be unique across all devices for the skill. The identifier must be consistent for all discovery requests for the same device. An identifier can contain letters or numbers, spaces, and the following special characters: _ - = # ; : ? @ &. The identifier can't exceed 256 characters.
            return id.replace(process.env.WEBTHINGSERVERURL + "/things/", '').substring(0, 255);
        };
        AlexaThings.prototype.getAlexaDisplayCategories = function (thing) {
            var alexaDiplayCategories = [];
            if (!_.has(thing, '@type'))
                return alexaDiplayCategories;
            for (var index = 0; index < thing['@type'].length; index++) {
                var type = thing['@type'][index];
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
        };
        AlexaThings.prototype.pushToAlexaCategories = function (alexaDiplayCategories, category) {
            if (!alexaDiplayCategories.includes(category))
                alexaDiplayCategories.push(category);
            return alexaDiplayCategories;
        };
        /**
         * Get Alexa Capabilities with (default) interfaces as a list
         *
         * @private
         * @param {Webthing.Thing} thing
         * @param {Array<AlexaGlobal.DisplayCategories>} alexaDiplayCategories
         * @returns {Array<AlexaDiscoveryInterface.AlexaCapabilityInterface>}
         * @memberof AlexaThings
         */
        AlexaThings.prototype.getAlexaCapabilities = function (thing, alexaDiplayCategories) {
            // Instantiate the list for Alexa Capability Interfaces with the default interface as described (https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-interface.html)
            // You should explicitly include the Alexa interface in the Discover.Response
            var alexaInterfaces = new AlexaDiscoveryInterface.AlexaCapabilities();
            for (var index = 0; index < alexaDiplayCategories.length; index++) {
                var alexaDiplayCategory = alexaDiplayCategories[index];
                var alexaInterface = this.getAlexaInterfaceForAlexaDisplayCategory(alexaDiplayCategory);
                if (alexaInterface === null)
                    continue;
                var alexaCapabilityProperty = this.getAlexaCapabilityPropertyForAlexaInterface(alexaInterface);
                ;
                if (alexaCapabilityProperty === null)
                    continue;
                var webthingPropertyName = this.getWebthingPropertyNameForAlexaDisplayCategory(alexaDiplayCategory);
                if (webthingPropertyName === null)
                    continue;
                var properties = this.getThingPropertiesForType(thing, webthingPropertyName, alexaInterface);
                var alexaCapability = new AlexaDiscoveryInterface.AlexaCapability();
                alexaCapability.interface = alexaInterface;
                alexaCapability.instance = properties[0].key;
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
        };
        AlexaThings.prototype.getAlexaCapabilityPropertyForAlexaInterface = function (alexaInteface) {
            switch (alexaInteface) {
                case AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR:
                    return AlexaGlobal.CapabilityProperty.TEMPERATUE;
                case AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER:
                    return AlexaGlobal.CapabilityProperty.POWER_STATE;
                default:
                    return null;
                    ;
            }
        };
        AlexaThings.prototype.getAlexaInterfaceForAlexaDisplayCategory = function (alexaDiplayCategory) {
            switch (alexaDiplayCategory) {
                case AlexaGlobal.DisplayCategories.TEMPERATURE_SENSOR:
                    return AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR;
                case AlexaGlobal.DisplayCategories.SMARTPLUG:
                    return AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER;
                default:
                    return null;
            }
        };
        AlexaThings.prototype.getWebthingPropertyNameForAlexaDisplayCategory = function (alexaDiplayCategory) {
            switch (alexaDiplayCategory) {
                case AlexaGlobal.DisplayCategories.TEMPERATURE_SENSOR:
                    return webthing_model_1.Webthing.PropertyType.TemperatureProperty;
                case AlexaGlobal.DisplayCategories.SMARTPLUG:
                    return webthing_model_1.Webthing.PropertyType.OnOffProperty;
                default:
                    return null;
            }
        };
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
        AlexaThings.prototype.getThingPropertiesForType = function (thing, propertyType, alexaInterface) {
            var props = [];
            for (var key in thing.properties) {
                var property = thing.properties[key];
                if (!_.has(property, '@type'))
                    continue;
                if (property['@type'] !== propertyType)
                    continue;
                property.key = key;
                property.alexaInterface = alexaInterface;
                props.push(property);
            }
            return props;
        };
        return AlexaThings;
    }());
    AlexaDiscoveryInterface.AlexaThings = AlexaThings;
})(AlexaDiscoveryInterface = exports.AlexaDiscoveryInterface || (exports.AlexaDiscoveryInterface = {}));
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
var AlexaResponseInterface;
(function (AlexaResponseInterface) {
    var Property = /** @class */ (function () {
        function Property(namespace, value, uncertaintyInMilliseconds) {
            this.namespace = namespace;
            this.name = null;
            this.value = null;
            switch (namespace) {
                case AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR:
                    this.name = AlexaGlobal.CapabilityProperty.TEMPERATUE;
                    this.value = {
                        value: Number(value),
                        scale: "CELSIUS"
                    };
                    break;
                case AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER:
                    this.name = AlexaGlobal.CapabilityProperty.POWER_STATE;
                    this.value = Boolean(value) ? 'ON' : 'OFF';
                    break;
            }
            this.timeOfSample = new Date().toISOString();
            this.uncertaintyInMilliseconds = uncertaintyInMilliseconds;
        }
        return Property;
    }());
    AlexaResponseInterface.Property = Property;
    var EventResponseInterface = /** @class */ (function () {
        function EventResponseInterface(event) {
            var headerNamespace = AlexaGlobal.Interfaces.ALEXA;
            var headerName = AlexaGlobal.DirectiveHeaderNames.RESPONSE;
            switch (event.directive.header.name) {
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
                messageId: event.directive.header.messageId,
                correlationToken: event.directive.header.correlationToken,
                payloadVersion: AlexaGlobal.DirectivePayloadVersion.VERSION3
            };
            this.event = {
                header: this.header,
                payload: {}
            };
            if (_.has(event.directive, 'endpoint'))
                this.event['endpoint'] = event.directive.endpoint;
            this.properties = [];
            this.context = {
                properties: this.properties
            };
        }
        EventResponseInterface.prototype.addEventPayloadEventsEndpoint = function (endpoints) {
            if (!_.has(this.event.payload, 'endpoints')) {
                this.event.payload = {
                    endpoints: []
                };
            }
            this.event.payload.endpoints = __spreadArrays(endpoints);
        };
        EventResponseInterface.prototype.getDiscoverResponse = function () {
            if (_.has(this.event, 'endpoint'))
                delete this.event['endpoint'];
            var response = {
                event: this.event
            };
            return response;
        };
        EventResponseInterface.prototype.getStateReportDirectiveResponse = function () {
            if (_.hasIn(this.event, 'endpoint.cookie'))
                delete this.event.endpoint['cookie'];
            var response = {
                event: this.event,
                context: this.context
            };
            return response;
        };
        /**
         * Get the response event for the Alexa directives like 'TurnOn', 'TurnOff', etc.
         * The body.header.messageId must include a '-R' at the end
         * (Seen here: https://developer.amazon.com/de-DE/docs/alexa/smarthome/steps-to-build-a-smart-home-skill.html)
         *
         * @returns {ResponseInterface}
         * @memberof EventResponseInterface
         */
        EventResponseInterface.prototype.getDirectiveResponse = function () {
            if (_.has(this.header, 'messageId'))
                this.header.messageId += '-R';
            var response = {
                event: this.event,
                context: this.context
            };
            return response;
        };
        EventResponseInterface.prototype.getResponse = function () {
            var response = {
                event: this.event,
                context: this.context
            };
            return response;
        };
        return EventResponseInterface;
    }());
    AlexaResponseInterface.EventResponseInterface = EventResponseInterface;
})(AlexaResponseInterface = exports.AlexaResponseInterface || (exports.AlexaResponseInterface = {}));
//# sourceMappingURL=alexa.model.js.map