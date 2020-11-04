import { KeycloakInstance } from 'keycloak-js';
import * as actionTypes from '../constants/actionTypes';
import { AccessToken } from '../types';

/**
 * Interface for anonymous login action type
 */
export interface AnonymousLoginAction {
  type: actionTypes.ANONYMOUS_LOGIN;
  accessToken: AccessToken;
}

/**
 * Interface for signed login action type
 */
export interface SignedLoginAction {
  type: actionTypes.SIGNED_LOGIN;
  accessToken: AccessToken;
  keycloak: KeycloakInstance;
}

/**
 * Interface for logout action type
 */
export interface SignedLogoutAction {
  type: actionTypes.SIGNED_LOGOUT;
}

/**
 * Store update method for anonymous access token
 *
 * @param keycloak keycloak instance
 */
export function anonymousLogin(accessToken: AccessToken): AnonymousLoginAction {
  return {
    type: actionTypes.ANONYMOUS_LOGIN,
    accessToken: accessToken
  };
}

/**
 * Store update method for signed access token
 *
 * @param keycloak keycloak instance
 */
export function signedLogin(keycloak: KeycloakInstance, accessToken: AccessToken): SignedLoginAction {
  return {
    type: actionTypes.SIGNED_LOGIN,
    accessToken: accessToken,
    keycloak: keycloak
  };
}

/**
 * Store logout method
 */
export function signedLogout(): SignedLogoutAction {
  return {
    type: actionTypes.SIGNED_LOGOUT
  };
}

export type AuthAction = AnonymousLoginAction | SignedLoginAction | SignedLogoutAction;