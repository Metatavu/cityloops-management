/* tslint:disable */
/* eslint-disable */
/**
 * CityLoops API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Item volume information
 * @export
 * @interface Volume
 */
export interface Volume {
    /**
     * Item volume
     * @type {number}
     * @memberof Volume
     */
    volume?: number;
    /**
     * Volume unit
     * @type {string}
     * @memberof Volume
     */
    unit?: string;
}

export function VolumeFromJSON(json: any): Volume {
    return VolumeFromJSONTyped(json, false);
}

export function VolumeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Volume {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'volume': !exists(json, 'volume') ? undefined : json['volume'],
        'unit': !exists(json, 'unit') ? undefined : json['unit'],
    };
}

export function VolumeToJSON(value?: Volume | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'volume': value.volume,
        'unit': value.unit,
    };
}


