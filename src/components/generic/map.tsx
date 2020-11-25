import * as React from "react";

import { WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/map";
import 'leaflet/dist/leaflet.css';
import { LocationInfo } from "../../generated/client";
import { Map, TileLayer } from "react-leaflet";
import L, { LatLngExpression, MarkerOptions, Map as MapInstance } from "leaflet";
import markerIcon from "../../resources/svg/marker.svg";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  locationInfo: LocationInfo;
  height?: string | number;
  width?: string | number;
  defaultZoomLevel?: number;
}

/**
 * Component state
 */
interface State {
}

/**
 * Component for map
 */
class MapComponent extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  /**
   * Instance of Leaflet map
   */
  private mapInstance?: MapInstance;

  /**
   * Custom icon
   */
  private customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: new L.Point(24, 48),
    iconAnchor: undefined,
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    className: "custom-icon"
  });

  /**
   * Location marker feature group
   */
  private locationMarker = new L.FeatureGroup();

  /**
   * Default coordinates
   */
  private defaultCoordinates: LatLngExpression = [61.6877956, 27.2726569];

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.addLocationMarkerToMap();
  }

  /**
   * Component did update life-cycle handler
   *
   * @param prevProps previous props
   */
  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.locationInfo.address !== this.props.locationInfo.address) {
      this.addLocationMarkerToMap();
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const {
      classes,
      height,
      width,
      defaultZoomLevel
    } = this.props;

    const coordinates = this.getCoordinates();

    return (
      <div
        style={{
          height: height || "100%",
          width: width || "100%" }}
      >
        <Map
          ref={ this.setMapRef }
          className={ classes.mapContainer }
          center={ coordinates }
          zoom={ defaultZoomLevel || 13 }
          scrollWheelZoom={ true }
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }

  /**
   * Updates Leaflet instance and adds marker
   *
   * @param mapRef map refs
   */
  private setMapRef = (mapRef: any) => {
    this.mapInstance = mapRef ? mapRef.leafletElement : undefined;

    if (!this.mapInstance) {
      return;
    }

    this.mapInstance.addLayer(this.locationMarker);
  }

  /**
   * Get coordinates as LatLngExpression
   *
   * @returns LatLngExpression
   */
  private getCoordinates = (): LatLngExpression => {
    const { locationInfo } = this.props;

    if (!locationInfo.coordinates) {
      return this.defaultCoordinates;
    }

    return([locationInfo.coordinates.latitude, locationInfo.coordinates.longitude]);
  }

  /**
   * Add marker to map
   */
  private addLocationMarkerToMap = () => {
    const { locationInfo } = this.props;
    const { locationMarker } = this;

    locationMarker.clearLayers();

    let coords: LatLngExpression = this.defaultCoordinates;

    if (locationInfo.coordinates) {
      coords = [locationInfo.coordinates.latitude, locationInfo.coordinates.longitude]
    }

    const markerOptions: MarkerOptions = {
      icon: this.customIcon,
      draggable: false
    };

    const customMarker = new L.Marker(coords, markerOptions);
    locationMarker.addLayer(customMarker);
  }
}

export default withStyles(styles)(MapComponent);
