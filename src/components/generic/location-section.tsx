import * as React from "react";
import { Box, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/location-section";
import { Coordinates, LocationInfo } from "../../generated/client";
import strings from "../../localization/strings";
import Map from "./map";
import MapFunctions from "../../utils/map-functions";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  locationInfo: LocationInfo;
  onUpdate?: (locationInfo: LocationInfo) => void;
}

/**
 * Component state
 */
interface State {
  coordinates?: Coordinates;
  searchValue: string;
}

/**
 * Component for location section
 */
class LocationSection extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: this.props.locationInfo.address || ""
    };
  }

  /**
   * Debounce delay for search field
   */
  private delay: NodeJS.Timeout | null = null;

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
    this.setCoordinates();
  }

  /**
   * Component did update life-cycle handler
   *
   * @param prevProps previous props
   */
  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.locationInfo.address !== this.props.locationInfo.address) {
      this.setCoordinates();
      this.setState({ searchValue: this.props.locationInfo.address || "" });
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes } = this.props;
    const { description, phone, email } = this.props.locationInfo;
    const { searchValue } = this.state;

    return (
      <div className={ classes.root }>
        <Typography variant="h4">
          { strings.items.location }
        </Typography>
        { this.renderTextField("description", strings.items.locationInfo.description, description || "") }
        { this.renderTextField("phone", strings.items.locationInfo.phone, phone || "") }
        { this.renderTextField("email", strings.items.locationInfo.email, email || "") }
        { this.renderTextField("address", strings.items.locationInfo.address, searchValue || "") }
        <div className={ classes.locationPlaceholder }>
          { this.renderMap() }
        </div>
      </div>
    );
  }

  /**
   * Renders text field with given parameters
   *
   * @param key text field key
   * @param displayName display name
   * @param value text field value
   */
  private renderTextField = (key: string, displayName: string, value: string) => {

    return (
      <Box mt={ 2 }>
        <TextField
          key={ key }
          label={ displayName }
          value={ value }
          onChange={ this.onChange(key) }
          fullWidth
          variant="outlined"
          InputLabelProps={{ variant: "outlined" }}
        />
      </Box>
    );
  };

  /**
   * Renders map component
   */
  private renderMap = () => {
    const { locationInfo } = this.props;
    const { coordinates } = this.state;

    return (
      <Box mt={ 2 }>
        <Map
          address={ locationInfo.address }
          coordinates={ coordinates }
        />
      </Box>
    );
  };

  /**
   * Event handler for text field value change
   *
   * @param key text field key
   * @param event react change event
   */
  private onChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { locationInfo, onUpdate } = this.props;

    const value = event.target.value;

    if (key === "address") {
      if (!this.delay) {
        this.delay = setTimeout(() => {
          this.updateValue(value);
        }, 500);
      } else {
        clearTimeout(this.delay);
        this.delay = setTimeout(() => {
          this.updateValue(value);
        }, 500);
      }

      this.setState({ searchValue: value });
      return;
    }

    if (locationInfo && onUpdate) {
      onUpdate({ ...locationInfo, [key]: value });
    }
  };

  /**
   * Update value with delay
   *
   * @param value value to update
   */
  private updateValue = (value: string) => {
    const { locationInfo, onUpdate } = this.props;

    if (locationInfo && onUpdate) {
      onUpdate({ ...locationInfo, address: value });
    }
  }

  /**
   * Sets coordinates for map
   */
  private setCoordinates = async () => {
    const { locationInfo } = this.props;

    if (!locationInfo.coordinates) {
      const response = await MapFunctions.fetchNewCoordinatesForAddress(locationInfo.address);
      const parsedCoordinates = await MapFunctions.parseCoordinates(response);
      this.setState({
        coordinates: parsedCoordinates
      });
    } else {
      this.setState({
        coordinates: locationInfo.coordinates
      });
    }
  }
}

export default withStyles(styles)(LocationSection);