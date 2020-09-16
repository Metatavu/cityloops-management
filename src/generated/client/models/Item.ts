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
    ItemProperty,
    ItemPropertyFromJSON,
    ItemPropertyFromJSONTyped,
    ItemPropertyToJSON,
    Metadata,
    MetadataFromJSON,
    MetadataFromJSONTyped,
    MetadataToJSON,
} from './';

/**
 * List item
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly id?: string;
    /**
     * Item title
     * @type {string}
     * @memberof Item
     */
    title: string;
    /**
     * Item category id
     * @type {string}
     * @memberof Item
     */
    category?: string;
    /**
     * Is item available only for companies
     * @type {boolean}
     * @memberof Item
     */
    onlyForCompanies: boolean;
    /**
     * 
     * @type {Metadata}
     * @memberof Item
     */
    metadata: Metadata;
    /**
     * List of image URLs
     * @type {Array<string>}
     * @memberof Item
     */
    images?: Array<string>;
    /**
     * URL path for thumbnail
     * @type {string}
     * @memberof Item
     */
    thumbnailUrl?: string;
    /**
     * 
     * @type {Array<ItemProperty>}
     * @memberof Item
     */
    properties?: Array<ItemProperty>;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly creatorId?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly lastModifierId?: string;
    /**
     * Created date
     * @type {Date}
     * @memberof Item
     */
    readonly createdAt?: Date;
    /**
     * Date modified
     * @type {Date}
     * @memberof Item
     */
    readonly modifiedAt?: Date;
}

export function ItemFromJSON(json: any): Item {
    return ItemFromJSONTyped(json, false);
}

export function ItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): Item {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': json['title'],
        'category': !exists(json, 'category') ? undefined : json['category'],
        'onlyForCompanies': json['onlyForCompanies'],
        'metadata': MetadataFromJSON(json['metadata']),
        'images': !exists(json, 'images') ? undefined : json['images'],
        'thumbnailUrl': !exists(json, 'thumbnailUrl') ? undefined : json['thumbnailUrl'],
        'properties': !exists(json, 'properties') ? undefined : ((json['properties'] as Array<any>).map(ItemPropertyFromJSON)),
        'creatorId': !exists(json, 'creatorId') ? undefined : json['creatorId'],
        'lastModifierId': !exists(json, 'lastModifierId') ? undefined : json['lastModifierId'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'modifiedAt': !exists(json, 'modifiedAt') ? undefined : (new Date(json['modifiedAt'])),
    };
}

export function ItemToJSON(value?: Item | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'category': value.category,
        'onlyForCompanies': value.onlyForCompanies,
        'metadata': MetadataToJSON(value.metadata),
        'images': value.images,
        'thumbnailUrl': value.thumbnailUrl,
        'properties': value.properties === undefined ? undefined : ((value.properties as Array<any>).map(ItemPropertyToJSON)),
    };
}


