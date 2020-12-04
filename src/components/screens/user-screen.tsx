import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";
import { KeycloakInstance } from "keycloak-js";
import strings from "../../localization/strings";
import { History } from "history";
import { Tab, Tabs, WithStyles, withStyles, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, GridDirection, GridProps, GridSize, IconButton, Typography, } from "@material-ui/core";
import styles from "../../styles/components/screens/user-screen";
import AppLayout from "../layouts/app-layout";
import { AccessToken, OSMData } from "../../types";
import ProductsTab from "../tabs/products-tab";
import CategoryEditorTab from "../tabs/category-editor-tab";
import MyInfoTab from "../tabs/my-info-tab";
import { Category, Coordinates, Item, ItemProperty, LocationInfo, User } from "../../generated/client";

import logo from "../../resources/images/toimintakeskus.png";
import produce from "immer"
import Api from "../../api/api";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: AccessToken;
  history: History;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  tabIndex: number;
  existingItem?: Item;
  item?: Item;
  dataChanged: boolean;
  user?: User;
}

/**
 * Component for User screen
 */
export class UserScreen extends React.Component<Props, State> {

    /**
   * Base path for Open Street Maps address search API
   */
  private osmAddressBasePath = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon_svg=1&namedetails=1&countrycodes=fi&q=";

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      tabIndex: 0,
      dataChanged: false
    };
  }

  /**
   * Default coordinates
   */
  private defaultCoordinates: Coordinates = {
    latitude: 61.6877956,
    longitude: 27.2726569
  };

    /**
   * Component did mount life cycle method
   */
  public componentDidMount = async () => {
    this.setState({ loading: true });
    await this.fetchUserInformation();
    this.setState({ loading: false });
  }

  /**
   * Component did update life cycle method
   */
  public componentDidUpdate = async (prevProps: Props) => {
    if (prevProps.signedToken === undefined && this.props.signedToken) {
      this.setState({ loading: true });
      await this.fetchUserInformation();
      this.setState({ loading: false });
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { tabIndex, user } = this.state;
    const { classes } = this.props;

    return (
      <AppLayout
        banner={ false }
      >
        <img
          className={ classes.logo }
          alt="Company logo"
          src={ logo }
        />
        <Tabs
          classes={{ indicator: classes.indicator }}
          onChange= { this.setTabIndex }
          value={ tabIndex }
        >
          <Tab label={ strings.userPage.products } value={ 0 }/>
          <Tab label={ strings.userPage.myInfo } value={ 1 }/>
          <Tab label={ strings.userPage.categories } value={ 2 }/>
        </Tabs>
        { tabIndex === 0 &&
          <ProductsTab />
        }
        { tabIndex === 1 &&
          <MyInfoTab
            coordinates={ this.defaultCoordinates }
            user={ user }
          />
        }
        { tabIndex === 2 &&
          <CategoryEditorTab />
        }
      </AppLayout>
    );
  }

    /**
   * Fetches user information
   */
  private fetchUserInformation = async () => {
    const { signedToken } = this.props

    if (!signedToken || !signedToken.userId) {
      return;
    }

    const usersApi = Api.getUsersApi(signedToken);
    const userId = signedToken.userId;

    const user = await usersApi.findUser({ userId: userId })
    
    this.setState({ user: user })
  }

  /**
   * Sets tab index
   *
   * @param event event object
   * @param newValue new tab index value
   */
  private setTabIndex = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      tabIndex: newValue
    });
  }

 
  /**
   * OSM API search function
   *
   * @param address address to search
   * @returns response promise
   */
  private fetchNewCoordinatesForAddress = async (address?: string): Promise<Response> => {
    return await fetch(`${this.osmAddressBasePath}${encodeURIComponent(address || "")}`);
  }

  /**
   * Parses coordinates from OSM response
   *
   * @param response OSM response
   * @returns coordinates promise
   */
  private parseCoordinates = async (response: Response): Promise<Coordinates> => {

    const coordinates: Coordinates = { ...this.defaultCoordinates };

    if (response.body === null) {
      return coordinates;
    }

    const osmData: OSMData[] = await response.json();
    if (osmData.length === 0) {
      return coordinates;
    }

    const firstResult = osmData[0];
    coordinates.latitude = Number(firstResult.lat);
    coordinates.longitude = Number(firstResult.lon);
    return coordinates;
  }

   /**
   * Update item location info
   *
   * @param locationInfo location info
   */
  private updateLocationInfo = async (locationInfo: LocationInfo) => {
    const { item } = this.state;

    const previousLocationInfo = item?.metadata.locationInfo;
    let newCoordinates: Coordinates = { ...this.defaultCoordinates };

    if (previousLocationInfo?.address !== locationInfo.address) {
      const response = await this.fetchNewCoordinatesForAddress(locationInfo.address);
      const parsedCoordinates = await this.parseCoordinates(response);
      newCoordinates = parsedCoordinates;
    }

    locationInfo.coordinates = newCoordinates;

    this.setState(
      produce((draft: State) => {
        draft.dataChanged = true;
        draft.item!.metadata.locationInfo = locationInfo;
      })
    );
  }

  /**
   * Update user information
   *
   * @param properties properties
   */
  private updateProperties = (properties: ItemProperty[]) => {
    this.setState({
      dataChanged: true,
      item: { ...this.state.item!, properties }
    });
  }
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    signedToken: state.auth.signedToken
  };
}

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: Dispatch<ReduxActions>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserScreen));
