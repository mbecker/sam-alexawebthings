# SAM-ALEXAWEBTHINGS

This repo includes the initial lambda scripts to control the Mozilla IoT Gateway with the Alexa Smart Home Skill

## Motivation

> Control your Mozilla IoT Gateway connected IoT devices with Alexa

The idea is that you control your local IoT devices connected to the Mozilla IoT Gateway with Alexa app or via oice (with a speaker in your room).

The setup should be developed locally for AWS Lambda. That means the application should be deployed and tested locally. Then it should be deployed to AWS automatically.


## TODO

- [ ] Update Typescript definiiton for AWS Lambda and Alexa requests/responses

- [ ] Add specific Alexa Events Response errors

- [x] Setup external openID Authorization Server

- [ ] Describe how to setup external Authorization provider

- [ ] Store user information like WebthingsURL, WebthingsJWT, etc. in the JWT from the authoriaztion server

- [ ] Setup Alexa Smart Home Skill in the file template.yaml to automatically link the Lambda function with the Alexa Smart Home skill

## Current implementation

The following section documents the current setup of the architecture, the status of the implementation and the working Iot Devices

## Branches

### authjwt

Includes the external authorization server with the jwt and the claims webthingsURL and webthingsJWt to query the remote Moziall Webthings Gateway.

### IoT Devices

An IoT device is connected to the Mozilla IoT Gateway (with a protocoll like Zigbee, ZWave, TCP/IP, etc.) and is registered as a special '@type'. The '@type' of the device is mapped the supported Alexa devices/interfaces.

- Shelly
- Philips
- Shutter
- Zigbee power plugs (Osram)


### Authorization Server

The current external authorization server for openid is Okta. At Okta I created an application. The authorizaion jwt includes the following jwt claims:

```json
{
  "ver": 1,
  "jti": "AT.fxahfNDGPtB7N0oNThoPyyGUyeIkLI8TTXoRhITxu-Y",
  "iss": "https://dev-xxx.okta.com/oauth2/xxxx",
  "aud": "http://alexawebthings.com",
  "iat": 1591986785,
  "exp": 1592073185,
  "cid": "xxx",
  "uid": "xx",
  "scp": [
    "profile",
    "webthings",
    "openid"
  ],
  "sub": "x",
  "webthingsJWT": "xxxx.eyJyb2xlIjoidXNlcl90b2tlbiIsImlhdCI6MTU5MTEwOTQ0MywiaXNzIjoiaHR0cHM6Ly9naW5zaGVpbS5tb3ppbGxhLWlvdC5vcmcifQ.Ghnj-bx7QOPB3qZnm5_yi8JYkTvIScTFP69FJiQVs8mvEQpYXhUfg99MPq0d2TnypKza_-jwh9i-59RoV80FNg",
  "webthingsURL": "https://xxx.mozilla-iot.org",
  "email": "xxx"
}
```

The claims webthingsJWT and webthingsURL are use to query the Mozilla Webthings Gateway at its remote URL.
(See branch 'authjwt')

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
- Check if the Alexa responses are correct according to the [Alexa Documentation](https://developer.amazon.com/de-DE/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html)
- Check local Mozilla IoT Gateway logs

# References

- Mozilla Webthings Gateway: [https://iot.mozilla.org/gateway/](https://iot.mozilla.org/gateway/)
- Alexa Documentation: [https://developer.amazon.com/de-DE/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html](https://developer.amazon.com/de-DE/docs/alexa/smarthome/state-reporting-for-a-smart-home-skill.html)
- AWS Command Line Interface (CLI): [https://aws.amazon.com/cli](https://aws.amazon.com/cli)
- AWS Serverless Application Model (SAM): [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- Okta Authorization Server: [https://www.okta.com/](https://www.okta.com/)
- Linking Alexa Smart Home Skill with Okta Authorization Server: [https://developer.okta.com/blog/2019/03/20/linking-your-alexa-skils-securely](https://developer.okta.com/blog/2019/03/20/linking-your-alexa-skils-securely)

