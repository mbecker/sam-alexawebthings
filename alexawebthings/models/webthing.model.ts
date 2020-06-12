import * as _ from "lodash";
import { log } from "../utils/log.utils";

import { AlexaGlobal, AlexaDiscoveryInterface }  from './alexa.model';

// import * as Webthing from 'Webthing';
// import * as AlexaDiscoveryInterface from 'AlexaDiscoveryInterface';

export namespace Webthing {

    export enum PropertyType {
        TemperatureProperty = 'TemperatureProperty',
        OnOffProperty = 'OnOffProperty',
    }

    export interface Link {
        rel: string;
        href: string;
    }

    export interface Temperature {
        title: string;
        type: string;
        '@type': string;
        unit: string;
        readOnly: boolean;
        links: Link[];
    }

    export interface Link2 {
        rel: string;
        href: string;
    }

    export interface FeelsLike {
        title: string;
        type: string;
        unit: string;
        readOnly: boolean;
        links: Link2[];
    }

    export interface Link3 {
        rel: string;
        href: string;
    }

    export interface Humidity {
        title: string;
        type: string;
        '@type': string;
        unit: string;
        minimum: number;
        maximum: number;
        readOnly: boolean;
        links: Link3[];
    }

    export interface Link4 {
        rel: string;
        href: string;
    }

    export interface CloudCover {
        title: string;
        type: string;
        '@type': string;
        unit: string;
        minimum: number;
        maximum: number;
        readOnly: boolean;
        links: Link4[];
    }

    export interface Link5 {
        rel: string;
        href: string;
    }

    export interface Pressure {
        title: string;
        type: string;
        unit: string;
        readOnly: boolean;
        links: Link5[];
    }

    export interface Link6 {
        rel: string;
        href: string;
    }

    export interface WindSpeed {
        title: string;
        type: string;
        unit: string;
        readOnly: boolean;
        links: Link6[];
    }

    export interface Link7 {
        rel: string;
        href: string;
    }

    export interface WindDirection {
        title: string;
        type: string;
        unit: string;
        readOnly: boolean;
        links: Link7[];
    }

    export interface Link8 {
        rel: string;
        href: string;
    }

    export interface Description {
        title: string;
        type: string;
        readOnly: boolean;
        links: Link8[];
    }

    export interface Link9 {
        rel: string;
        href: string;
    }

    export interface Raining {
        title: string;
        type: string;
        readOnly: boolean;
        links: Link9[];
    }

    export interface Link10 {
        rel: string;
        href: string;
    }

    export interface Snowing {
        title: string;
        type: string;
        readOnly: boolean;
        links: Link10[];
    }

    export interface Property {
        temperature: Temperature;
        feelsLike: FeelsLike;
        humidity: Humidity;
        cloudCover: CloudCover;
        pressure: Pressure;
        windSpeed: WindSpeed;
        windDirection: WindDirection;
        description: Description;
        raining: Raining;
        snowing: Snowing;
        key?: string;
        alexaInterface?: string;
    }

    export interface PropertyResponse { [key:string]:string|number; }

    export interface Actions {
    }

    export interface Events {
    }

    export interface Link11 {
        rel: string;
        href: string;
        mediaType: string;
    }

    export interface Oauth2Sc {
        scheme: string;
        flow: string;
        authorization: string;
        token: string;
        scopes: string[];
    }

    export interface SecurityDefinitions {
        oauth2_sc: Oauth2Sc;
    }

    export interface Thing {
        title: string;
        '@context': string;
        '@type': string[];
        description: string;
        href: string;
        properties: Property;
        actions: Actions;
        events: Events;
        links: Link11[];
        floorplanX: number;
        floorplanY: number;
        layoutIndex: number;
        selectedCapability: string;
        iconHref?: any;
        id: string;
        base: string;
        securityDefinitions: SecurityDefinitions;
        security: string;
    }

}