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
 * Item category object
 * @export
 * @interface Category
 */
export interface Category {
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    readonly id?: string;
    /**
     * Category name
     * @type {string}
     * @memberof Category
     */
    name: string;
    /**
     * Parent category
     * @type {string}
     * @memberof Category
     */
    parentCategoryId?: string;
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    readonly creatorId?: string;
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    readonly lastModifierId?: string;
    /**
     * Created date
     * @type {Date}
     * @memberof Category
     */
    readonly createdAt?: Date;
    /**
     * Date modified
     * @type {Date}
     * @memberof Category
     */
    readonly modifiedAt?: Date;
}

export function CategoryFromJSON(json: any): Category {
    return CategoryFromJSONTyped(json, false);
}

export function CategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Category {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': json['name'],
        'parentCategoryId': !exists(json, 'parentCategoryId') ? undefined : json['parentCategoryId'],
        'creatorId': !exists(json, 'creatorId') ? undefined : json['creatorId'],
        'lastModifierId': !exists(json, 'lastModifierId') ? undefined : json['lastModifierId'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'modifiedAt': !exists(json, 'modifiedAt') ? undefined : (new Date(json['modifiedAt'])),
    };
}

export function CategoryToJSON(value?: Category | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'parentCategoryId': value.parentCategoryId,
    };
}


