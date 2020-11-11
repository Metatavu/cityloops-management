import { Item } from "../../generated/client";

/**
 * Utility class for materiaalitori api calls
 */
export default class MTOperations {

	/**
	 * List items from API
	 *
	 * @param accessToken access token
	 */
	public static listItems = async (): Promise<Item[]> => {
		const apiPath = process.env.REACT_APP_MATERIAALITORI_API_BASE_URL || "";

			const response = await fetch(apiPath, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const mtItems: any[] = await response.json();
			const items: Item[] = [];

			mtItems.forEach(item => {
				const newItem: Item = {
					title: item.title,
					metadata: {
						locationInfo: { }
					},
					properties: [
					],
					onlyForCompanies: false,
					userId: "materiaalitori",
					category: item.rfoType
				};
				items.push(newItem);
			});

			return items;
  }

}