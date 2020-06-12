export function consoleLogSomething() {
    console.log('Why hello there!');
}

/**
 * @param  {any[]} ...messages The messages to log
 * @return {void} console.log(msg)
 */
export const log = (...messages: any[]) => {
    console.log('--- DEBUG ---');
    for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        if (message instanceof Error) {
            console.error(message);
            continue;
        }
        if(typeof message === 'object' || Array.isArray(message)) {
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