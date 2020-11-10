import { Category } from "../generated/client";

/**
 * Interface describing an access token
 */
export interface AccessToken {
  created: Date;
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  refresh_expires_in?: number;
  firstName?: string;
  lastName?: string;
  userId?: string;
}

/**
 * Interface describing anonymous login configuration
 */
export interface AnonymousLoginConfig {
  url: string;
  realm: string;
  clientId: string;
  username: string;
  password: string;
}

/**
 * Interface describing signed login configuration
 */
export interface SignedLoginConfig {
  url: string;
  realm: string;
  clientId: string;
}

/**
 * User login info
 */
export interface LoginInfo {
  username?: string;
  password?: string;
}

/**
 * Interface describing an category data holder
 */
export interface CategoryDataHolder {
  category: Category;
  childCategories: CategoryDataHolder[];
}

/**
 * Supported text field types
 */
export enum TextFieldTypes {
  STRING = "string",
  BOOLEAN = "boolean",
  PASSWORD = "password"
}