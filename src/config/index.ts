import { SignedLoginConfig, AnonymousLoginConfig } from "../types";

/**
 * Helper class for handling configurations
 */
export default class Config {

  /**
   * Returns used realm
   *
   * @returns used realm
   */
  public static getRealm = () => {
    return process.env.REACT_APP_KEYCLOAK_REALM as string;
  }

  /**
   * Returns anonymous login config
   *
   * @returns anonymous login config
   */
  public static getAnonymousLoginConfig = (): AnonymousLoginConfig => {
    return {
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "",
      url: `${process.env.REACT_APP_KEYCLOAK_URL}`,
      username: process.env.REACT_APP_KEYCLOAK_ANONYMOUS_USER || "",
      password: process.env.REACT_APP_KEYCLOAK_ANONYMOUS_PASS || "",
      realm: process.env.REACT_APP_KEYCLOAK_REALM || ""
    };
  }

  /**
   * Returns signed login config
   *
   * @returns signed login config
   */
  public static getSignedLoginConfig = (): SignedLoginConfig => {
    return {
      url: process.env.REACT_APP_KEYCLOAK_URL || "",
      realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || ""
    };
  }

}