/**
 * @param  {any[]} ...messages The messages to log
 * @return {void} console.log(msg)
 */

export enum LogType {
    DEBUG = "DEBUG",
    INFO = "INFO",
    ERROR = "ERROR",
}

export const log = (logType: LogType, ...messages: any[]) => {

    if (process.env.NODE_ENV === 'production' && logType !== LogType.ERROR) return;

    console.log(`--- ${logType} ---`);
    for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        if (message instanceof Error) {
            console.error(message);
            continue;
        }
        if (typeof message === 'object' || Array.isArray(message)) {
            try {
                console.log(JSON.stringify(message, null, 2));
            } catch (err) {
                console.log(message);
            }
            continue;
        }
        console.log(message);
    }
    console.log('------');
}