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
import {
    Condition,
    ConditionFromJSON,
    ConditionFromJSONTyped,
    ConditionToJSON,
    Volume,
    VolumeFromJSON,
    VolumeFromJSONTyped,
    VolumeToJSON,
} from './';

/**
 * Search hound object
 * @export
 * @interface SearchHound
 */
export interface SearchHound {
    /**
     * Search hound name
     * @type {string}
     * @memberof SearchHound
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof SearchHound
     */
    notificationsOn: boolean;
    /**
     * List of category ids
     * @type {Array<string>}
     * @memberof SearchHound
     */
    categories: Array<string>;
    /**
     * List of user ids
     * @type {Array<string>}
     * @memberof SearchHound
     */
    users?: Array<string>;
    /**
     * Minimum price of the item
     * @type {number}
     * @memberof SearchHound
     */
    minPrice?: number;
    /**
     * Maximum price of the item
     * @type {number}
     * @memberof SearchHound
     */
    maxPrice?: number;
    /**
     * How far from users location/address search will try to find items
     * @type {number}
     * @memberof SearchHound
     */
    locationRange?: number;
    /**
     * Minimum amount of items
     * @type {number}
     * @memberof SearchHound
     */
    minAmount?: number;
    /**
     * Maximum amount of items
     * @type {number}
     * @memberof SearchHound
     */
    maxAmount?: number;
    /**
     * 
     * @type {Volume}
     * @memberof SearchHound
     */
    minVolume?: Volume;
    /**
     * 
     * @type {Volume}
     * @memberof SearchHound
     */
    maxVolume?: Volume;
    /**
     * 
     * @type {Condition}
     * @memberof SearchHound
     */
    condition?: Condition;
    /**
     * When seach hound expires
     * @type {Date}
     * @memberof SearchHound
     */
    expires?: Date;
    /**
     * 
     * @type {string}
     * @memberof SearchHound
     */
    readonly creatorId?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchHound
     */
    readonly lastModifierId?: string;
    /**
     * Created date
     * @type {Date}
     * @memberof SearchHound
     */
    readonly createdAt?: Date;
    /**
     * Date modified
     * @type {Date}
     * @memberof SearchHound
     */
    readonly modifiedAt?: Date;
}

export function SearchHoundFromJSON(json: any): SearchHound {
    return SearchHoundFromJSONTyped(json, false);
}

export function SearchHoundFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchHound {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'notificationsOn': json['notificationsOn'],
        'categories': json['categories'],
        'users': !exists(json, 'users') ? undefined : json['users'],
        'minPrice': !exists(json, 'minPrice') ? undefined : json['minPrice'],
        'maxPrice': !exists(json, 'maxPrice') ? undefined : json['maxPrice'],
        'locationRange': !exists(json, 'locationRange') ? undefined : json['locationRange'],
        'minAmount': !exists(json, 'minAmount') ? undefined : json['minAmount'],
        'maxAmount': !exists(json, 'maxAmount') ? undefined : json['maxAmount'],
        'minVolume': !exists(json, 'minVolume') ? undefined : VolumeFromJSON(json['minVolume']),
        'maxVolume': !exists(json, 'maxVolume') ? undefined : VolumeFromJSON(json['maxVolume']),
        'condition': !exists(json, 'condition') ? undefined : ConditionFromJSON(json['condition']),
        'expires': !exists(json, 'expires') ? undefined : (new Date(json['expires'])),
        'creatorId': !exists(json, 'creatorId') ? undefined : json['creatorId'],
        'lastModifierId': !exists(json, 'lastModifierId') ? undefined : json['lastModifierId'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'modifiedAt': !exists(json, 'modifiedAt') ? undefined : (new Date(json['modifiedAt'])),
    };
}

export function SearchHoundToJSON(value?: SearchHound | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'notificationsOn': value.notificationsOn,
        'categories': value.categories,
        'users': value.users,
        'minPrice': value.minPrice,
        'maxPrice': value.maxPrice,
        'locationRange': value.locationRange,
        'minAmount': value.minAmount,
        'maxAmount': value.maxAmount,
        'minVolume': VolumeToJSON(value.minVolume),
        'maxVolume': VolumeToJSON(value.maxVolume),
        'condition': ConditionToJSON(value.condition),
        'expires': value.expires === undefined ? undefined : (value.expires.toISOString()),
    };
}


