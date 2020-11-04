// eslint-disable-next-line max-len
import { CategoriesApi, Configuration, ItemsApi, SearchHoundsApi, UsersApi } from "../generated/client";
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
   * Gets initialized users api
   *
   * @param token access token
   */
  public static getUsersApi(accessToken: AccessToken) {
    return new UsersApi(Api.getConfiguration(accessToken));
  }

  /**
   * Gets initialized search hounds api
   *
   * @param token access token
   */
  public static getSearchHoundsApi(accessToken: AccessToken) {
    return new SearchHoundsApi(Api.getConfiguration(accessToken));
  }

  /**
   * Gets api configuration
   *
   * @param token access token
   */
  private static getConfiguration(accessToken: AccessToken) {
    return new Configuration({
      basePath: process.env.REACT_APP_API_BASE_PATH,
      accessToken: accessToken.access_token
    });
  }

}
