"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlexaGlobal;
(function (AlexaGlobal) {
    var DirectivePayloadVersion;
    (function (DirectivePayloadVersion) {
        DirectivePayloadVersion["VERSION3"] = "3";
    })(DirectivePayloadVersion = AlexaGlobal.DirectivePayloadVersion || (AlexaGlobal.DirectivePayloadVersion = {}));
    var DirectiveHeaderNames;
    (function (DirectiveHeaderNames) {
        DirectiveHeaderNames["DISCOVER"] = "Discover";
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
    var CapabilitySupportedNames;
    (function (CapabilitySupportedNames) {
        CapabilitySupportedNames["TEMPERATUE"] = "temperature";
        CapabilitySupportedNames["POWER_STATE"] = "powerState";
    })(CapabilitySupportedNames = AlexaGlobal.CapabilitySupportedNames || (AlexaGlobal.CapabilitySupportedNames = {}));
})(AlexaGlobal = exports.AlexaGlobal || (exports.AlexaGlobal = {}));
var AlexaDiscoveryInterface;
(function (AlexaDiscoveryInterface) {
    var AlexaCapability = /** @class */ (function () {
        function AlexaCapability() {
            this.type = 'AlexaInterface';
            this.interface = 'Alexa.';
            this.instance = 'Webthing';
            this.version = '3';
            // this.cookie = {};
        }
        return AlexaCapability;
    }());
    AlexaDiscoveryInterface.AlexaCapability = AlexaCapability;
})(AlexaDiscoveryInterface = exports.AlexaDiscoveryInterface || (exports.AlexaDiscoveryInterface = {}));
var AlexaReportState;
(function (AlexaReportState) {
    var Property = /** @class */ (function () {
        function Property(namespace, value, uncertaintyInMilliseconds) {
            this.namespace = namespace;
            this.name = null;
            this.value = null;
            switch (namespace) {
                case AlexaGlobal.Interfaces.ALEXA_TEMPERATURE_SENSOR:
                    this.name = AlexaGlobal.CapabilitySupportedNames.TEMPERATUE;
                    this.value = {
                        value: Number(value),
                        scale: "CELSIUS"
                    };
                    break;
                case AlexaGlobal.Interfaces.ALEXA_POWER_CONTROLLER:
                    this.name = AlexaGlobal.CapabilitySupportedNames.POWER_STATE;
                    this.value = Boolean(value) ? 'ON' : 'OFF';
                    break;
            }
            this.timeOfSample = new Date().toISOString();
            this.uncertaintyInMilliseconds = uncertaintyInMilliseconds;
        }
        return Property;
    }());
    AlexaReportState.Property = Property;
    var EventResponseInterface = /** @class */ (function () {
        function EventResponseInterface(event) {
            this.header = {
                namespace: AlexaGlobal.Interfaces.ALEXA,
                name: (event.directive.header.name === AlexaGlobal.DirectiveHeaderNames.REPORTSTATE) ? AlexaGlobal.DirectiveHeaderNames.STATEREPORT : AlexaGlobal.DirectiveHeaderNames.RESPONSE,
                messageId: event.directive.header.messageId + "-R",
                correlationToken: event.directive.header.correlationToken,
                payloadVersion: AlexaGlobal.DirectivePayloadVersion.VERSION3
            };
            this.endpoint = event.directive.endpoint;
            this.event = {
                header: this.header,
                endpoint: this.endpoint,
                payload: {}
            };
            this.properties = [];
            this.context = {
                properties: this.properties
            };
        }
        EventResponseInterface.prototype.getResponse = function () {
            var response = {
                event: this.event,
                context: this.context
            };
            return response;
        };
        return EventResponseInterface;
    }());
    AlexaReportState.EventResponseInterface = EventResponseInterface;
})(AlexaReportState = exports.AlexaReportState || (exports.AlexaReportState = {}));
//# sourceMappingURL=alexa.discover.models.js.map