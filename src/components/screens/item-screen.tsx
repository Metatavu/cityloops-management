import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/item-screen";
import { Button, CircularProgress, Grid, Typography, WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken, SignedToken } from "../../types";
import { Item } from "../../generated/client";
import strings from "../../localization/strings";
import Api from "../../api/api";
import AppLayout from "../layouts/app-layout";
import SearchBar from "../generic/search-bar";
import ImageCarousel from "../generic/image-carousel";
import moment from "moment";
import LocationIcon from "@material-ui/icons/Room";
import Map from "../generic/map";
import ItemFormDialog from "../generic/item-form-dialog";
import GenericConfirmDialog from "../generic/generic-confirm-dialog";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  history: History;
  itemId: string;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  item?: Item;
  formOpen: boolean;
  deleteDialogOpen: boolean;
  deleteLoading: boolean;
  successfulDelete: boolean;
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
      loading: true,
      formOpen: false,
      deleteDialogOpen: false,
      deleteLoading: false,
      successfulDelete: false
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
        <AppLayout
          banner={ false }
        >
          <div className={ classes.loaderContainer }>
            <CircularProgress size={ 40 } color="secondary" />
          </div>
        </AppLayout>
      );
    }

    return (
      <AppLayout
        banner={ false }
      >
        <SearchBar categories={ [] }/>
        <div className={ classes.propertiesSection }>
          { this.renderPropertiesSection() }
        </div>
        <div className={ classes.locationSection }>
          { this.renderLocation() }
          { this.renderMap() }
        </div>
        { this.renderItemFormDialog() }
        { this.renderDeleteDialog() }
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
      <div className={ classes.titleContainer }>
        <Typography
          variant="h1"
          className={ classes.itemTitle }
        >
          { item ? item?.title : strings.error.itemNotFound }
        </Typography>
        <Typography
          variant="h1"
          className={ classes.itemPrice }
        >
          { item ? `${ item.price } ${ item.priceUnit }` : "" }
        </Typography>
      </div>
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
              { this.renderPriceInfo() }
            </div>
          </Grid>
        </Grid>
        <div className={ classes.bottomContent }>
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
          { this.renderItemActionButtons() }
        </div>
      </>
    );
  }

  /**
   * Renders item action buttons
   */
  private renderItemActionButtons = () => {
    const { signedToken, classes } = this.props;
    const { item } = this.state;

    if (!item || !signedToken || item.userId !== signedToken.userId) {
      return null;
    }

    return (
      <div className={ classes.actionButtonsContainer } >
        <Button
          size="small"
          variant="outlined"
          color="primary"
          className={ classes.deleteButton }
          onClick={ this.toggleDeleteDialog }
        >
          { strings.generic.delete }
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={ classes.editButton }
          onClick={ () => this.setState({ formOpen: true }) }
        >
          { strings.generic.edit }
        </Button>
      </div>
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
   * Renders properties
   */
  private renderPriceInfo = () => {
    const { classes } = this.props;
    const { item } = this.state;

    if (!item) {
      return null;
    }

    const deliveryText = item.delivery ?
      strings.items.delivery.yes :
      strings.items.delivery.no;

    return (
      <>
        <Typography
          paragraph
          className={ classes.propertyTitle }
        >
          { strings.items.delivery.title }
        </Typography>
        <Typography
          paragraph
          className={ classes.propertyValue }
        >
          { deliveryText }
        </Typography>

        { item.delivery &&
          <>
            <Typography
              paragraph
              className={ classes.propertyTitle }
            >
              { strings.items.deliveryPrice }
            </Typography>
            <Typography
              paragraph
              className={ classes.propertyValue }
            >
              { `${item.deliveryPrice}€` || strings.items.deliveryPrice }
            </Typography>
          </>
        }

        <Typography
          paragraph
          className={ classes.propertyTitle }
        >
          { strings.items.paymentMethod }
        </Typography>
        <Typography
          paragraph
          className={ classes.propertyValue }
        >
          { item.paymentMethod }
        </Typography>
      </>
    );
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

    if (!item) {
      return null;
    }

    const { address, coordinates } = item.metadata.locationInfo;

    return (
      <Map
        address={ address }
        coordinates={ coordinates }
        defaultZoomLevel={ 15 }
      />
    );
  }

  /**
   * Render item form dialog
   */
  private renderItemFormDialog = () => {
    const { formOpen, item } = this.state;

    return (
      <ItemFormDialog
        existingItem={ item }
        open={ formOpen }
        onClose={ () => this.setState({ formOpen: false }) }
        onUpdated={ this.updateItem }
      />
    );
  }

  /**
   * Render delete dialog
   * TODO: Add error message logic
   */
  private renderDeleteDialog = () => {
    const {
      deleteDialogOpen,
      item,
      successfulDelete,
      deleteLoading
    } = this.state;

    return (
      <GenericConfirmDialog
        open={ deleteDialogOpen }
        loading={ deleteLoading }
        success={ successfulDelete }
        title={
          strings.formatString(
            strings.generic.customConfirmDelete,
            strings.items.item,
            item?.title || ""
          ) as string
        }
        confirmButtonText={ strings.generic.delete }
        cancelButtonText={ strings.generic.cancel }
        successCloseButtonText={ strings.items.returnToFrontPage }
        successTitle={ strings.items.deletionSuccessful }
        onCancel={ this.toggleDeleteDialog }
        onClose={ this.toggleDeleteDialog }
        onConfirm={ this.onDeleteClick }
        onSuccessClose={ this.onSuccessfulDeleteCloseClick }
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

  /**
   * Updates item in list
   *
   * @param itemToUpdate item to update
   */
  private updateItem = async (itemToUpdate: Item) => {
    const { signedToken, itemId } = this.props;

    if (!signedToken) {
      return;
    }

    const itemsApi = Api.getItemsApi(signedToken);
    const updatedItem = await itemsApi.updateItem({
      item: itemToUpdate,
      itemId: itemId
    });

    this.setState({
      item: updatedItem
    });
  }

  /**
   * Event handler for delete click
   */
  private onDeleteClick = async () => {
    const { signedToken, itemId } = this.props;

    if (!signedToken) {
      return;
    }

    this.setState({ deleteLoading: true });
    const itemsApi = Api.getItemsApi(signedToken);
    await itemsApi.deleteItem({ itemId: itemId })
      .then(() => this.setState({ successfulDelete: true, deleteLoading: false }))
      .catch(e => console.error(e));
  }

  /**
   * Toggle delete dialog
   */
  private toggleDeleteDialog = () => {
    this.setState({ deleteDialogOpen: !this.state.deleteDialogOpen });
  }

  /**
   * Toggle edit form dialog
   */
  private toggleEditFormDialog = () => {
    this.setState({ formOpen: !this.state.formOpen });
  }

  /**
   * Event handler for closing dialog after successful delete
   */
  private onSuccessfulDeleteCloseClick = () => {
    const { history } = this.props;
    this.toggleDeleteDialog();
    history.replace("/");
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
