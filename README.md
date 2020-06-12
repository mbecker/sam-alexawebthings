# SAM-ALEXAWEBTHINGS

This repo includes the initial lambda scripts to control the Mozilla IoT Gateway with the Alexa Smart Home Skill

## Motivation

> Control your Mozilla IoT Gateway connected IoT devices with Alexa

The idea is that you control your local IoT devices connected to the Mozilla IoT Gateway with Alexa app or via oice (with a speaker in your room).

The setup should be developed locally for AWS Lambda. That means the application should be deployed and tested locally. Then it should be deployed to AWS automatically.


## TODO

- [ ] Update Typescript definiiton for AWS Lambda and Alexa requests/responses

- [ ] Setup external openID Authorization Server

- [ ] Store user information like WebthingsURL, WebthingsJWT, etc. in the JWT from the authoriaztion server

- [ ] Setup Alexa Smart Home Skill in the file template.yaml to automatically link the Lambda function with the Alexa Smart Home skill

## Current implementation

The following section documents the current setup of the architecture, the status of the implementation and the working Iot Devices

### IoT Devices

An IoT device is connected to the Mozilla IoT Gateway (with a protocoll like Zigbee, ZWave, TCP/IP, etc.) and is registered as a special '@type'. The '@type' of the device is mapped the supported Alexa devices/interfaces.

- Shelly
- Philips
- Shutter
- Zigbee power plugs (Osram)



### Authorization Server

Okta

## Prerequisites

- Existing local Mozilla IoT Gateway
- Setup of remote URL to access your local gateway like https://yourgatewayurl.mozilla-iot.org
- Login to the Mozilla IoT Gateway (either local or remote) via HTTP API to get the login JWT
- Add all parameters to the file 'env.json'
- Install and configure AWS CLI and AWS SAM (see AWS documentation for help)
- Setup Alexa Smart Home Skill
- Build and deploy script with 'npm run deploy:sam'
- Link Alexa Smart Home Skill with your deployed Lambda function
- Add an external openID Authorization Server to enable linking to your Alexa Skill
- Activate Alexa Smart Home Skill and search for new devies


# Debugging

- Check the AWS Lambda loggin; check AWS CloudWatch for logging statements
- Identify the Alexa requestest (directives or discovery) and the Alexa responses (events like Staereport or Discover.Response )
- Check if the Alexa responses are correct according to the Alexa Documentation (https://developer.amazon.com/de-DE/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html)[https://developer.amazon.com/de-DE/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html]
- Check local Mozilla IoT Gateway logs
