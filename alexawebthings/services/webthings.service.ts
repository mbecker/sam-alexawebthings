import axios from 'axios';
import * as _ from "lodash";

import { Webthing } from '../models/webthing.model';
import { AlexaDiscoveryInterface } from '../models/alexa.model'
import { User } from '../models/user.model';

export async function handleThingsRequest(user: User.IUser): Promise<AlexaDiscoveryInterface.AlexaThings> {

    const options = {
        method: 'get',
        url: `${user.webthingsUrl}/things`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.webthingsJwt}`
        }
    };

    try {
        const response = await axios(options);
        if (response.status !== 200) throw new Error(`Things request results in http status ${response.status}`)
        if (response.data.length === 0) throw new Error('No things in webthing http response.')
        return new AlexaDiscoveryInterface.AlexaThings(response.data);
    } catch (err) {
        throw err;
    }

}

export async function handleThingPropertyRequest(user: User.IUser, endpointID: string): Promise<Webthing.PropertyResponse> {
    const options = {
        method: 'get',
        url: `${user.webthingsUrl}/things/${endpointID}/properties`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.webthingsJwt}`
        }
    };

    try {
        const response = await axios(options);
        if (response.status !== 200) throw new Error(`Thing property get report state request results in http status ${response.status}`)
        if (response.data.length === 0) throw new Error('No thing properties in webthing http response.')
        const data: Webthing.PropertyResponse = response.data!;
        return data;
    } catch (err) {
        throw err;
    }

    // return new Promise<Webthing.PropertyResponse>(async (resolve, reject) => {
    //     try {
    //         const response = await axios(options);
    //         if (response.status !== 200) throw new Error(`Thing property get report state request results in http status ${response.status}`)
    //         if (response.data.length === 0) throw new Error('No thing properties in webthing http response.')
    //         const data: Webthing.PropertyResponse = response.data!;
    //         resolve(data);
    //     } catch (err) {
    //         reject(err);
    //     }
    // });

}

export async function handleThingPropertyPut(user: User.IUser, endpointID: string, propertyKey: string, propertyValue: any): Promise<Webthing.PropertyResponse> {
    const options = {
        method: 'put',
        url: `${user.webthingsUrl}/things/${endpointID}/properties/${propertyKey}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.webthingsJwt}`
        },
        data: JSON.stringify({ [propertyKey]: propertyValue })
    };

    try {
        // Request the current status of the property to see if the value to send is already set
        // BUG: The Mozilla Webthings Gateway does not return a status if the requestedt status is alreay the current status of a property (for example the current status of the property is '{relay0: false}' and you request the same then no value is returned)
        // const thingPropertiesCurrentStatus: Webthing.PropertyResponse = await handleThingPropertyRequest(endpointID);
        // if(_.has(thingPropertiesCurrentStatus, propertyKey) && thingPropertiesCurrentStatus[`${propertyKey}`] === propertyValue) return {[`${propertyKey}`]: propertyValue};
        const response = await axios(options);
        if (response.status !== 200) throw new Error(`Thing property put request results in http status ${response.status}`)
        if (Object.keys(response.data).length === 0) throw new Error('No thing property key for property put in webthing http response.')
        const data: Webthing.PropertyResponse = response.data!;
        return data;
    } catch (err) {
        throw Error(err);
    }
    
}