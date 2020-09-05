import { AuthAction } from '../actions/auth';
import { LOGIN, LOGOUT } from '../constants/actionTypes';
import { KeycloakInstance } from 'keycloak-js';
import { AccessToken } from '../types';

/**
 * Redux auth state
 */
export interface AuthState {
  accessToken?: AccessToken;
  keycloak?: KeycloakInstance;
}

/**
 * Initial keycloak state
 */
const initialState: AuthState = {
  accessToken: undefined,
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
    case LOGIN:
      const keycloak = action.keycloak;
      const { token, tokenParsed } = keycloak;
      const userId = tokenParsed?.sub;
      const accessToken = token && userId ?
        { token, userId } as AccessToken :
        undefined;

      return { ...authState, keycloak, accessToken };
    case LOGOUT:
      return { ...authState, keycloak: undefined, accessToken: undefined };
    default:
      return authState;
  }
}
