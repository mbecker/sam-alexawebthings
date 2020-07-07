'use strict';

const path = require('path');
const fs = require('fs');
const toml = require('toml');

// Use the third party module to start the cmd process 'sam'
const shell = require('shelljs');

// Define constants
const templateFile = path.resolve(__dirname, '..', '..', 'template.yaml');
const templateDeploymentFile = path.resolve(__dirname, '..', '..', 'template.deployment.yaml');
const envParameterFile = path.resolve(__dirname, '..', '..', 'env.json');
const samConfigFile = path.resolve(__dirname, '..', '..', 'samconfig.toml');


/**
 * Creates a new/updated template file for the sam deployment
 * The existings template.yaml file has some example environment parameters which should be replaced for a production deployment *
 */
async function createDeploymentTemplate() {
  try {
    let data = fs.readFileSync(templateFile, 'utf8');

    // Red the env parameters and replace the corresponding env parameters (key/value) in the data:string from the file 'template.yaml'
    const envs = JSON.parse(fs.readFileSync(envParameterFile));
    for (let [key, value] of Object.entries(envs.Parameters)) {
        var re = new RegExp(`${key}.*`, "g");
        const replaceValue = `${key}: ${value}`;
        data = data.replace(re, replaceValue);
    }

    // Save the replces data:string as a new file 'template.deployment.yaml'
    fs.writeFileSync(templateDeploymentFile, data, 'utf8');
} catch (err) {
    console.error(err);
}
}

/**
 * Deploys the template file 'template.deployment.yaml' by executing the aws cli
 * - Re
 *
 */
async function samDeployment() {
  try {

    // AWS SAM Config TOML
    // Reads the samconfig.toml file which use by AWS SAM to deploy the template
    let samconfig = toml.parse(fs.readFileSync(samConfigFile, 'utf8'));
    let samDeployOptions = '';
    for (let [key, value] of Object.entries(samconfig.default.deploy.parameters)) {
      // Continue the 'parameter_overrides' because we us the environment paameters from the file 'env.json' added to the new template file 'template.deployment.file'
      if(key === 'parameter_overrides') continue;
      // Add the key as a command ('--') and add the value to the AWS SAM deployment options
      samDeployOptions += `--${key.replace('_','-')} ${value} `
    }

    // BUG: The env parameters (I think the JWT) is taken as an input parameter for '--parameter-override' but not deployed to AWS Lambda
    //      Use the following code as reference for a later implementation
    // Environment paramaters
    // Read the env parameters from the env.json
    // let envs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'env.json'), 'utf8'));
    // let params = '';
    // for (let [key, value] of Object.entries(envs.Parameters)) {
    //     params += `"ParameterKey=${key},ParameterValue=${value.replace(' ', `\ `)}" `;
    // }    
    // Remove the last 2 chars from the string 'params' as the last 2 chars are ', ' (added in the for loop)
    // params = params.slice(0, params.length - 1);
    
    // Not needed because we creating a new/updated template file --parameter-overrides '${params}'
    // BUG: The flag --parameter-overried doesnt add the env parameters from the file env.json. The default values in the original template.yaml are used (that's why we are creating a new file)
    const deploymentStatement = `sam deploy ${samDeployOptions} --template ${templateDeploymentFile} --no-confirm-changeset`;

    console.log("--- START SAM:DEPLOYMENT SCRIPT ---");
    console.log(deploymentStatement);
    
    // Start the cmd process 'sam' to deploy the 'template.deployment.yaml'
    shell.exec(deploymentStatement, function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    });
  } catch (err) {
      console.log(err)
  }
};

async function main() {
  try {
    await createDeploymentTemplate();
    await samDeployment();
  } catch (err) {
    console.log(err);
  }
}

main();

