import Keycloak from 'keycloak-js';
import * as actionTypes from '../constants/actionTypes';
import { AccessToken, SignedToken } from '../types';

/**
 * Interface for setting keycloak instance
 */
export interface KeycloakAction {
  type: actionTypes.SET_KEYCLOAK;
  keycloak: Keycloak;
}

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
  accessToken?: SignedToken;
}

/**
 * Interface for logout action type
 */
export interface SignedLogoutAction {
  type: actionTypes.SIGNED_LOGOUT;
}

/**
 * Store keycloak instance
 *
 * @param keycloak keycloak instance to store
 */
export function setKeycloak(keycloak: Keycloak): KeycloakAction {
  return {
    type: actionTypes.SET_KEYCLOAK,
    keycloak: keycloak
  };
}

/**
 * Store update method for anonymous access token
 *
 * @param accessToken access token
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
 * @param accessToken access token
 */
export function signedLogin(accessToken?: SignedToken): SignedLoginAction {
  return {
    type: actionTypes.SIGNED_LOGIN,
    accessToken: accessToken
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

export type AuthAction = KeycloakAction | AnonymousLoginAction | SignedLoginAction | SignedLogoutAction;