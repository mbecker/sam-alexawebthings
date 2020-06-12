import * as _ from "lodash";
import { log } from "../utils/log.utils";
const jsonwebtoken = require('jsonwebtoken');

export module JWT {

    export enum JWTWerbthingsConstants {
        WebthingsJWT = 'webthingsJWT',
        WebthingsURL = 'webthingsURL',
    }

    export interface JWTInterface {
        ver?: number;
        jti?: string;
        iss?: string;
        aud?: string;
        iat?: number;
        exp?: number;
        cid?: string;
        uid?: string;
        scp?: string[];
        sub?: string;
        webthingsJWT: string | undefined;
        webthingsURL: string | undefined;
        email?: string;
    }

    export class JWT implements JWTInterface {
        ver?: number;
        jti?: string;
        iss?: string;
        aud?: string;
        iat?: number;
        exp?: number;
        cid?: string;
        uid?: string;
        scp?: string[];
        sub?: string;
        webthingsJWT: string | undefined;
        webthingsURL: string | undefined;
        email?: string;

        constructor(tokenstring: string) {
            const token = jsonwebtoken.decode(tokenstring);
            log("token", token);
            if (token === null) {
                this.webthingsJWT = undefined;
                this.webthingsURL = undefined;
            } else {
                if (!_.has(token, 'webthingsJWT')) {
                    this.webthingsJWT = undefined;
                } else {
                    this.webthingsJWT = token.webthingsJWT!;
                }
                if (!_.has(token, 'webthingsURL')) {
                    this.webthingsURL = undefined;
                } else {
                    this.webthingsURL = token.webthingsURL!;
                }
            }
        }

        hasWebthings(type: JWTWerbthingsConstants): boolean {
            switch (type) {
                case JWTWerbthingsConstants.WebthingsJWT:
                    if (this.webthingsJWT === undefined) return false;
                    return true;
                case JWTWerbthingsConstants.WebthingsURL:
                    if (this.webthingsURL === undefined) return false;
                    return true;
                default:
                    return false;
            }
        }

    }

}