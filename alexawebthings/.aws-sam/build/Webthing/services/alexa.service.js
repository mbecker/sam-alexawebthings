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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var alexa_model_1 = require("../models/alexa.model");
function handleThingsRequest() {
    return __awaiter(this, void 0, void 0, function () {
        var options, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        method: 'get',
                        url: process.env.WEBTHINGSERVERURL + "/things",
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': "Bearer " + process.env.WEBTHINGTOKEN
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default(options)];
                case 2:
                    response = _a.sent();
                    if (response.status !== 200)
                        throw new Error("Things request results in http status " + response.status);
                    if (response.data.length === 0)
                        throw new Error('No things in webthing http response.');
                    return [2 /*return*/, new alexa_model_1.AlexaDiscoveryInterface.AlexaThings(response.data)];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleThingsRequest = handleThingsRequest;
function handleThingPropertyRequest(endpointID) {
    return __awaiter(this, void 0, void 0, function () {
        var options, response, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        method: 'get',
                        url: process.env.WEBTHINGSERVERURL + "/things/" + endpointID + "/properties",
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': "Bearer " + process.env.WEBTHINGTOKEN
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default(options)];
                case 2:
                    response = _a.sent();
                    if (response.status !== 200)
                        throw new Error("Thing property get report state request results in http status " + response.status);
                    if (response.data.length === 0)
                        throw new Error('No thing properties in webthing http response.');
                    data = response.data;
                    return [2 /*return*/, data];
                case 3:
                    err_2 = _a.sent();
                    throw err_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleThingPropertyRequest = handleThingPropertyRequest;
function handleThingPropertyPut(endpointID, propertyKey, propertyValue) {
    return __awaiter(this, void 0, void 0, function () {
        var options, response, data, err_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        method: 'put',
                        url: process.env.WEBTHINGSERVERURL + "/things/" + endpointID + "/properties/" + propertyKey,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + process.env.WEBTHINGTOKEN
                        },
                        data: JSON.stringify((_a = {}, _a[propertyKey] = propertyValue, _a))
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default(options)];
                case 2:
                    response = _b.sent();
                    if (response.status !== 200)
                        throw new Error("Thing property put request results in http status " + response.status);
                    if (Object.keys(response.data).length === 0)
                        throw new Error('No thing property key for property put in webthing http response.');
                    data = response.data;
                    return [2 /*return*/, data];
                case 3:
                    err_3 = _b.sent();
                    throw Error(err_3);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleThingPropertyPut = handleThingPropertyPut;
//# sourceMappingURL=alexa.service.js.map