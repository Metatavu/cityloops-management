// eslint-disable-next-line max-len
import { CategoriesApi, Configuration, ItemsApi } from "../generated/client";
import { AccessToken } from "../types";

/**
 * Utility class for loading api with predefined configuration
 */
export default class Api {

  /**
   * Gets initialized categories api
   *
   * @param token access token
   */
  public static getCategoriesApi(accessToken: AccessToken) {
    return new CategoriesApi(Api.getConfiguration(accessToken));
  }

  /**
   * Gets initialized items api
   *
   * @param token access token
   */
  public static getItemsApi(accessToken: AccessToken) {
    return new ItemsApi(Api.getConfiguration(accessToken));
  }

  /**
   * Gets api configuration
   *
   * @param token acess token
   */
  private static getConfiguration(accessToken: AccessToken) {
    return new Configuration({
      basePath: process.env.REACT_APP_API_BASE_PATH,
      accessToken: accessToken.token
    });
  }

}
