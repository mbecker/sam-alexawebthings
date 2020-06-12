"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function consoleLogSomething() {
    console.log('Why hello there!');
}
exports.consoleLogSomething = consoleLogSomething;
/**
 * @param  {any[]} ...messages The messages to log
 * @return {void} console.log(msg)
 */
exports.log = function () {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    console.log('--- DEBUG ---');
    for (var index = 0; index < messages.length; index++) {
        var message = messages[index];
        if (message instanceof Error) {
            console.error(message);
            continue;
        }
        if (typeof message === 'object' || Array.isArray(message)) {
            try {
                console.log(JSON.stringify(message, null, 2));
            }
            catch (err) {
                console.log(message);
            }
            continue;
        }
        console.log(message);
    }
    console.log('------');
};
//# sourceMappingURL=log.utils.js.map