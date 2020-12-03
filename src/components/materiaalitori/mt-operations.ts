import * as querystring from "query-string";
import { SearchParams } from "../../types";

/**
 * Utility class for materiaalitori api calls
 */
export default class MTOperations {

	/**
	 * List items from Materiaalitori API
	 *
	 * @param searchParams search parameters
	 * @param token continuation token for Materiaalitori
	 * @returns response promise
	 */
	public static listItems = async (searchParams: SearchParams, token?: string): Promise<Response> => {
		const apiPath = process.env.REACT_APP_MATERIAALITORI_AWS_GATEWAY_URL || "";

		const url = querystring.stringifyUrl(
			{ url: apiPath,
				query: {
				"continuationToken": token,
				"classification": searchParams.category ? searchParams?.category.name.toLocaleLowerCase() : ""
				}
			}
		);

		return await fetch(
			url,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
  };
}