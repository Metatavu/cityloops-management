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
 * Key value pairs for items
 * @export
 * @interface ItemProperty
 */
export interface ItemProperty {
    /**
     * Property key
     * @type {string}
     * @memberof ItemProperty
     */
    key: string;
    /**
     * Property value
     * @type {string}
     * @memberof ItemProperty
     */
    value: string;
}

export function ItemPropertyFromJSON(json: any): ItemProperty {
    return ItemPropertyFromJSONTyped(json, false);
}

export function ItemPropertyFromJSONTyped(json: any, ignoreDiscriminator: boolean): ItemProperty {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': json['key'],
        'value': json['value'],
    };
}

export function ItemPropertyToJSON(value?: ItemProperty | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'value': value.value,
    };
}


