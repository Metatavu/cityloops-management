import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/item-screen";
import { CircularProgress, Grid, Typography, WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken } from '../../types';
import { Item } from "../../generated/client";
import strings from "../../localization/strings";
import Api from "../../api/api";
import AppLayout from "../layouts/app-layout";
import SearchBar from "../generic/search-bar";
import ImageCarousel from "../generic/image-carousel";
import moment from "moment";
import LocationIcon from '@material-ui/icons/Room';
import Map from "../generic/map";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: AccessToken;
  history: History;
  itemId: string;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  item?: Item;
}

/**
 * Component for item screen
 */
export class ItemScreen extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
    this.setState({ loading: true });
    await this.fetchData();
    this.setState({ loading: false });
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <AppLayout>
          <div className={ classes.loaderContainer }>
            <CircularProgress size={ 40 } color="secondary" />
          </div>
        </AppLayout>
      );
    }

    return (
      <AppLayout>
        <SearchBar categories={[]}/>
        <div className={ classes.propertiesSection }>
          { this.renderPropertiesSection() }
        </div>
        <div className={ classes.locationSection }>
          { this.renderLocation() }
          { this.renderMap() }
        </div>
      </AppLayout>
    );
  }

  /**
   * Renders properties section
   */
  private renderPropertiesSection = () => {
    const { classes } = this.props;
    const { item } = this.state;

    return (
      <>
        <Typography
          variant="h1"
          className={ classes.itemTitle }
        >
          { item ? item?.title : strings.error.itemNotFound }
        </Typography>
        <Grid
          container
          spacing={ 3 }
          className={ classes.columns }
          alignItems="stretch"
        >
          <Grid
            item
            xs={ 12 }
            md
          >
            <ImageCarousel
              imageUrls={ item?.images || [] }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            md
          >
            <div className={ classes.propertiesContainer }>
              { this.renderProperties() }
            </div>
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          className={ classes.createdAt }
        >
          { item &&
            strings.formatString(
              strings.items.createdAt,
              moment(item.createdAt).format("DD.MM.YYYY HH:mm")
            )
          }
        </Typography>
      </>
    );
  }

  /**
   * Renders properties
   */
  private renderProperties = () => {
    const { classes } = this.props;
    const { item } = this.state;

    return item?.properties ?
      item.properties.map(property => {
        return (
          <>
            <Typography
              paragraph
              className={ classes.propertyTitle }
            >
              { property.key }
            </Typography>
            <Typography
              paragraph
              className={ classes.propertyValue }
            >
              { property.value }
            </Typography>
          </>
        );
      }) :
      [];
  }

  /**
   * Renders location
   */
  private renderLocation = () => {
    const { classes } = this.props;
    const { item } = this.state;
    return item && (
      <div className={ classes.locationContainer }>
        <LocationIcon className={ classes.locationIcon }/>
        <Typography variant="body1">
          { item.metadata.locationInfo.address }
        </Typography>
      </div>
    );
  }

  /**
   * Renders map
   */
  private renderMap = () => {
    const { item } = this.state;

    return item && (
      <Map
        locationInfo={ item.metadata.locationInfo }
        height={ "500px" }
        defaultZoomLevel={ 15 }
      />
    );
  }

  /**
   * Fetch needed data
   */
  private fetchData = async () => {
    const { anonymousToken, itemId } = this.props;

    if (!anonymousToken) {
      return;
    }

    const itemsApi = Api.getItemsApi(anonymousToken);
    const item = await itemsApi.findItem({ itemId });
    this.setState({ item });
  }
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    keycloak: state.auth.keycloak,
    anonymousToken: state.auth.anonymousToken,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemScreen));
