import { AuthAction } from '../actions/auth';
import { ANONYMOUS_LOGIN, SET_KEYCLOAK, SIGNED_LOGIN, SIGNED_LOGOUT } from '../constants/actionTypes';
import { KeycloakInstance } from 'keycloak-js';
import { AccessToken, SignedToken } from '../types';

/**
 * Redux auth state
 */
export interface AuthState {
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  keycloak?: KeycloakInstance;
}

/**
 * Initial keycloak state
 */
const initialState: AuthState = {
  anonymousToken: undefined,
  signedToken: undefined,
  keycloak: undefined
};

/**
 * Redux reducer for authorization
 *
 * @param authState auth state
 * @param authAction auth action
 * @returns changed auth state
 */
export function authReducer(authState: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case SET_KEYCLOAK:
      return {
        ...authState,
        keycloak: action.keycloak
      };
    case ANONYMOUS_LOGIN:
      return {
        ...authState,
        anonymousToken: action.accessToken
      };
    case SIGNED_LOGIN:
      return {
        ...authState,
        signedToken: action.accessToken
      };
    case SIGNED_LOGOUT:
      return {
        ...authState,
        keycloak: undefined,
        signedToken: undefined
      };
    default:
      return authState;
  }
}
