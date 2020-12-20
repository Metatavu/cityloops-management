import { LatLngExpression } from "leaflet";
import { Coordinates } from "../generated/client";
import { OSMData } from "../types";

/**
 * Class for map related functions
 */
export default class MapFunctions {

  /**
   * Base path for Open Street Maps address search API
   */
  static osmAddressBasePath = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon_svg=1&namedetails=1&countrycodes=fi&q=";

  /**
   * Default coordinates in spec Coordinate format
   */
  public static defaultCoordinates: Coordinates = {
    latitude: 61.6877956,
    longitude: 27.2726569
  };

  /**
   * Default coordinates in Leaflet LatLngExpression format
   */
  public static defaultLatLng: LatLngExpression = [ 61.6877956, 27.2726569 ];

  /**
   * OSM API search function
   *
   * @param address address to search
   * @returns response promise
   */
  public static fetchNewCoordinatesForAddress = async (address?: string): Promise<Response> => {
    return await fetch(`${MapFunctions.osmAddressBasePath}${encodeURIComponent(address || "")}`);
  };

  /**
   * Parses coordinates from OSM response
   *
   * @param response OSM response
   * @returns coordinates promise
   */
  public static parseCoordinates = async (response: Response): Promise<Coordinates> => {

    const coordinates: Coordinates = { ...MapFunctions.defaultCoordinates };

    if (response.body === null) {
      return coordinates;
    }

    const osmData: OSMData[] = await response.json();
    if (osmData.length === 0) {
      return coordinates;
    }

    /**
     * TODO: Add support for address suggestions in dropdown
     */
    const firstResult = osmData[0];
    coordinates.latitude = Number(firstResult.lat);
    coordinates.longitude = Number(firstResult.lon);
    return coordinates;
  }
}
