# SAM-ALEXAWEBTHINGS

This repo includes the initial lambda scripts to control the Mozilla IoT Gateway with the Alexa Smart Home Skill

## Motivation

> Control your Mozilla IoT Gateway connected IoT devices with Alexa

## TODO

- Setup external openID Authorization Server
- Store user information like WebthingsURL, WebthingsJWT, etc. in the JWT from the authoriaztion server

## Current implementation

## IoT Devices

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
