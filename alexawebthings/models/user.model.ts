

import AWS from 'aws-sdk';
// TODO: Do we need to set the region?
//AWS.config.update({region: 'eu-west-1'});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const docClient = new AWS.DynamoDB.DocumentClient()

import * as _ from "lodash";
import { log, LogType } from '../utils/log.utils';
import { CryptoHelper } from './cryptohelper';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

const jsonwebtoken = require('jsonwebtoken');

declare module DynamoDB {

    export interface ITypename {
        S: string;
    }

    export interface ICreatedAt {
        S: Date;
    }

    export interface IUuid {
        S: string;
    }

    export interface IWebthingurl {
        S: string;
    }

    export interface IWebthingjwt {
        S: string;
    }

    export interface IUpdatedAt {
        S: Date;
    }

    export interface IUser {
        __typename: ITypename;
        createdAt: ICreatedAt;
        uuid: IUuid;
        webthingurl: IWebthingurl;
        webthingjwt: IWebthingjwt;
        updatedAt: IUpdatedAt;
    }

}


export module User {
    export interface IUser {
        username: string | undefined;
        webthingsUrl?: string;
        webthingsJwt?: string;
    }

    export interface IJwt {
        sub: string;
        token_use: string;
        scope: string;
        auth_time: number;
        iss: string;
        exp: number;
        iat: number;
        version: number;
        jti: string;
        client_id: string;
        username: string;
    }

    export enum IFAlexaCounter {
        Discovery = 'discovery',
        ReportState = 'reportstate',
        PowerController = 'powercontroller',
    }

    export function addCount(user: IUser, counterType: IFAlexaCounter) {
        if (!user.username) return log(LogType.ERROR, 'user.mode', 'addCount', 'error: No this.username exists');
        const dt = new Date();
        const countdate: string= `${dt.getFullYear()}${('0' + (dt.getMonth() + 1)).slice(-2)}`;

        var params = {
            TableName: process.env.DYNAMODBCOUNT,
            Key: {
                'uuid': { S: user.username },
                'countdate': { S:  countdate}
            },
            // ConditionExpression: `countdate = :dateyearmonth`,
            UpdateExpression: `ADD #counterType :val, #total :val SET #updatedAt =  :dt, #lastrequest = :dt`,
            ExpressionAttributeNames: {
                '#counterType': `${counterType}`,
                '#total': 'total',
                '#updatedAt': 'updatedAt',
                '#lastrequest': 'lastrequest'
            },
            ExpressionAttributeValues: {
                ':val': { N: '1' },
                ':dt': { S: new Date().toISOString() }
                // ':dateyearmonth': {S: `${dt.getFullYear()}${('0'+(dt.getMonth()+1)).slice(-2)}`}  // 202007, 202008, 202011
            },
            ReturnValues: "UPDATED_NEW"
        };

        log(LogType.DEBUG,"user.model", "Updating counter type: " + counterType, params);

        ddb.updateItem(params, function (err, data) {
            if (err) {
                log(LogType.ERROR,'user.mode', 'addCount', new Error("Unable to update item. Error JSON"), JSON.stringify(err, null, 2));
            } else {
                log(LogType.DEBUG,'user.mode', 'addCount', "UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });

        const webthingsrequestParams: AWS.DynamoDB.UpdateItemInput = {
            TableName: process.env.DYNAMODBREQUEST,
            Key: {
                'uuid': { S: user.username },
                'countdate': { S:  countdate}
            },
            // ConditionExpression: `countdate = :dateyearmonth`,
            UpdateExpression: `ADD #counterType :val, #total :val SET #updatedAt =  :dt, #createdAt = if_not_exists(#createdAt, :dt)`,
            ExpressionAttributeNames: {
                '#counterType': `${counterType}`,
                '#total': 'total',
                '#updatedAt': 'updatedAt',
                '#createdAt': 'createdAt'
            },
            ExpressionAttributeValues: {
                ':val': { N: '1' },
                ':dt': { S: new Date().toISOString() },
                // ':dateyearmonth': {S: `${dt.getFullYear()}${('0'+(dt.getMonth()+1)).slice(-2)}`}  // 202007, 202008, 202011
            },
            ReturnValues: "UPDATED_NEW"
        };

        log(LogType.DEBUG,"user.model", "Updating counter type: " + counterType, params);

        ddb.updateItem(webthingsrequestParams, function (err, data) {
            if (err) {
                log(LogType.ERROR,'user.mode', 'addCount', new Error("Unable to update item. Error JSON"), JSON.stringify(err, null, 2));
            } else {
                log(LogType.DEBUG,'user.mode', 'addCount', "UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }

    export class User implements IUser {
        username: string | undefined;
        webthingsUrl?: string | undefined;
        webthingsJwt?: string | undefined;
        createdAt?: string;
        updatedAt?: string;

        constructor(tokenstring: string) {
            const token = jsonwebtoken.decode(tokenstring) as IJwt | null;
            if (token === null) {
                this.username = undefined;
            } else {
                if (_.has(token, 'username')) {
                    this.username = token.username;
                }
            }
        }

        async getUserInformation(): Promise<User> {

            try {
                if (!this.username) throw new Error('No username exists for user.')
                const params = {
                    TableName: process.env.DYNAMODBCUSTOMER,
                    Key: {
                        'uuid': { S: this.username }
                    }
                };
                const data = await ddb.getItem(params).promise();
                if (!_.has(data, 'Item')) throw new Error('DynamoDB.GetItemOutput.Item does not exist.')
                const item = data.Item!;
                if (!_.has(item, 'url')) throw new Error('DynamoDB.GetItemOutput.Item has no attribute url.')
                if (!_.has(item, 'token')) throw new Error('DynamoDB.GetItemOutput.Item has no attribute token.')
                this.webthingsUrl = CryptoHelper.crypto_helper.decrypt(item.url.S!);
                this.webthingsJwt = CryptoHelper.crypto_helper.decrypt(item.token.S!);
                if (_.has(item, 'createdAt')) this.createdAt = item.createdAt.S!;
                if (_.has(item, 'updatedAt')) this.updatedAt = item.updatedAt.S!;
                return this;
            } catch (err) {
                return err;
            }


        }

    }
}
