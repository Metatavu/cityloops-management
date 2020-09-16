import Api from "../api/api";
import { AccessToken } from "../types";

/**
 * Utility class for generic api calls
 */
export default class ApiOperations {

	/**
	 * List items from API
	 *
	 * @param accessToken access token
	 */
	public static listItems = async (accessToken: AccessToken) => {
		const itemsApi = Api.getItemsApi(accessToken);
		return await itemsApi.listItems({ });
  }

}