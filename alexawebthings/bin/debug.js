'use strict';

const path = require('path');
const fs = require('fs');

const envParameterFile = path.resolve(__dirname, '..', '..', 'env.json');
const debugFilespath = path.resolve(__dirname, '..', '..', 'events');

const stringToReplace = 'access-token-from-skill';

async function createDebugFiles() {
    try {
        const envs = JSON.parse(fs.readFileSync(envParameterFile));
        if (!Object.prototype.hasOwnProperty.call(envs, 'Debug') || !Object.prototype.hasOwnProperty.call(envs.Debug, 'EXTAUTHTOKEN')) throw new Error('No envs.Debug.EXTAUTHTOKEN');
        const debugFiles = fs.readdirSync(debugFilespath);

        // files object contains all files names
        // log them on console
        debugFiles.forEach(debugFile => {
            if (!debugFile.includes('debug')) {
                var re = new RegExp(`${stringToReplace}`, "g");
                let data = fs.readFileSync(path.resolve(debugFilespath, debugFile), 'utf8');
                data = data.replace(re, envs.Debug.EXTAUTHTOKEN);
                const debugFileName = `${path.parse(debugFile).name}.debug.json`;
                fs.writeFileSync(path.resolve(debugFilespath, debugFileName), data, 'utf8');
                console.log(`Created debug file: ${debugFileName}`);
            }
        });

    } catch (err) {
        throw err;
    }
}

async function main() {
    try {
        await createDebugFiles();
    } catch (err) {
        console.log(err);
    }
}

main();