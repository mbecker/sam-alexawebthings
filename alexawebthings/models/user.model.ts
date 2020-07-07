

import AWS from 'aws-sdk';
// TODO: Do we need to set the region?
//AWS.config.update({region: 'eu-west-1'});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

import * as _ from "lodash";

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
                    TableName: 'Webthing-5y5l2zfbizdbfl2i4hpwilrfa4-dev',
                    Key: {
                        'uuid': { S: this.username }
                    }
                };
                const data = await ddb.getItem(params).promise();
                if (!_.has(data, 'Item')) throw new Error('DynamoDB.GetItemOutput.Item does not exist.')
                const item = data.Item!;
                if (!_.has(item, 'webthingurl')) throw new Error('DynamoDB.GetItemOutput.Item has no attribute webthingurl.')
                if (!_.has(item, 'webthingjwt')) throw new Error('DynamoDB.GetItemOutput.Item has no attribute webthingjwt.')
                this.webthingsUrl = item.webthingurl.S!;
                this.webthingsJwt = item.webthingjwt.S!;
                if (_.has(item, 'createdAt')) this.createdAt = item.createdAt.S!;
                if (_.has(item, 'updatedAt')) this.updatedAt = item.updatedAt.S!;
                return this;
            } catch (err) {
                return err;
            }


        }
    }
}
