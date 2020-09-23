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
    UserRole,
    UserRoleFromJSON,
    UserRoleFromJSONTyped,
    UserRoleToJSON,
} from './';

/**
 * User object
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {string}
     * @memberof User
     */
    readonly id?: string;
    /**
     * User name
     * @type {string}
     * @memberof User
     */
    name: string;
    /**
     * User address
     * @type {string}
     * @memberof User
     */
    address: string;
    /**
     * User email
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * User phone number
     * @type {string}
     * @memberof User
     */
    phoneNumber: string;
    /**
     * Is this user company account
     * @type {boolean}
     * @memberof User
     */
    companyAccount: boolean;
    /**
     * 
     * @type {UserRole}
     * @memberof User
     */
    role: UserRole;
    /**
     * List of users search hound ids
     * @type {Array<string>}
     * @memberof User
     */
    searchHounds?: Array<string>;
    /**
     * Has this user been verified/allowed to use online payment
     * @type {boolean}
     * @memberof User
     */
    verified?: boolean;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    readonly creatorId?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    readonly lastModifierId?: string;
    /**
     * Created date
     * @type {Date}
     * @memberof User
     */
    readonly createdAt?: Date;
    /**
     * Date modified
     * @type {Date}
     * @memberof User
     */
    readonly modifiedAt?: Date;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': json['name'],
        'address': json['address'],
        'email': json['email'],
        'phoneNumber': json['phoneNumber'],
        'companyAccount': json['companyAccount'],
        'role': UserRoleFromJSON(json['role']),
        'searchHounds': !exists(json, 'searchHounds') ? undefined : json['searchHounds'],
        'verified': !exists(json, 'verified') ? undefined : json['verified'],
        'creatorId': !exists(json, 'creatorId') ? undefined : json['creatorId'],
        'lastModifierId': !exists(json, 'lastModifierId') ? undefined : json['lastModifierId'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'modifiedAt': !exists(json, 'modifiedAt') ? undefined : (new Date(json['modifiedAt'])),
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'address': value.address,
        'email': value.email,
        'phoneNumber': value.phoneNumber,
        'companyAccount': value.companyAccount,
        'role': UserRoleToJSON(value.role),
        'searchHounds': value.searchHounds,
        'verified': value.verified,
    };
}

