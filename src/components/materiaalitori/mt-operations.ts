import * as querystring from "query-string";

/**
 * Utility class for materiaalitori api calls
 */
export default class MTOperations {

	/**
	 * List items from Materiaalitori API
	 */
	public static listItems = async (token?: string): Promise<Response> => {
		const apiPath = process.env.REACT_APP_MATERIAALITORI_AWS_GATEWAY_URL || "";

		const url = querystring.stringifyUrl({ url: apiPath, query: { "continuationToken": token } });

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