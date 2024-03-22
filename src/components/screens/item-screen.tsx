import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/item-screen";
import { Box, Button, CircularProgress, Divider, Grid, Link, Typography, WithStyles, withStyles } from "@material-ui/core";
import Keycloak from "keycloak-js";
import { AccessToken, SignedToken } from "../../types";
import { Item, ItemType, PublicUser } from "../../generated/client";
import strings from "../../localization/strings";
import Api from "../../api/api";
import AppLayout from "../layouts/app-layout";
import ImageCarousel from "../generic/image-carousel";
import moment from "moment";
import LocationIcon from "@material-ui/icons/Room";
import Map from "../generic/map";
import ItemFormDialog from "../generic/item-form-dialog";
import GenericConfirmDialog from "../generic/generic-confirm-dialog";
import { ArrowBack } from "@material-ui/icons";
import theme from "../../styles/theme";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  keycloak?: Keycloak;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  history: History;
  itemId: string;
  locale: string;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  item?: Item;
  publicUser?: PublicUser;
  formOpen: boolean;
  deleteDialogOpen: boolean;
  deleteLoading: boolean;
  successfulDelete: boolean;
  updateOpen: boolean;
  successfulUpdate: boolean;
  updateLoading: boolean;
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
      successfulDelete: false,
      updateOpen: false,
      successfulUpdate: false,
      updateLoading: false
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
    window.scrollTo(0, 0);
    this.setState({ loading: true });
    await this.fetchData();
    this.setState({ loading: false });
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes, history } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <AppLayout
          banner={ false }
          history={ history }
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
        history={ history }
      >
        <Link
          underline="none"
          onClick={ () => this.props.history.push("/") }
        >
          <Button
            variant="text"
            startIcon={ <ArrowBack /> }
          >
            { strings.items.returnToFrontPage }
          </Button>
        </Link>
        <div className={ classes.propertiesSection }>
          { this.renderPropertiesSection() }
        </div>
        <div className={ classes.locationSection }>
          { this.renderUserInfo() }
          { this.renderLocation() }
          { this.renderMap() }
        </div>
        { this.renderItemFormDialog() }
        { this.renderDeleteDialog() }
        { this.renderItemUpdatedDialog() }
      </AppLayout>
    );
  }

  /**
   * Renders properties section
   */
  private renderPropertiesSection = () => {
    const { classes, signedToken } = this.props;
    const { item } = this.state;

    if (!item) {
      return (
        <div key="titleContainer" className={ classes.titleContainer }>
          <Typography
            variant="h1"
            className={ classes.itemTitle }
          >
            { strings.error.itemNotFound }
          </Typography>
        </div>
      );
    }

    return (
      <>
        <div key="titleContainer" className={ classes.titleContainer }>
          <Typography
            variant="h1"
            className={ classes.itemTitle }
          >
            { item.title }
          </Typography>
        </div>
        <Grid
          key="contentContainer"
          container
          spacing={ 3 }
          className={ classes.columns }
          alignItems="stretch"
        >
          <Grid item xs={ 12 } md>
            <ImageCarousel
              imageUrls={ item?.images || [] }
            />
          </Grid>
          <Grid item xs={ 12 } md>
            <div className={ classes.propertiesContainer }>
              { item.price &&
                <Typography variant="h2" className={ classes.itemPrice }>
                  { /^[0-9.,]+$/.test(item.price) ? `${item.price} €` : item.price }
                </Typography>
              }
              { this.renderProperties() }
              <Divider />
              { signedToken ?
                this.renderSellerInfo()
              :
                <Box mt={ 2 }>
                  <Typography>{ strings.items.registerToSeeSellerInfo }</Typography>
                </Box>
              }
              { this.renderPriceInfo() }
            </div>
          </Grid>
        </Grid>
        <div className={ classes.bottomContent }>
          <Typography
            key="createdAt"
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

    if (!item || !signedToken || (signedToken.userId !== item.userId && !signedToken.roles?.includes("admin"))) {
      return null;
    }

    return (
      <div className={ classes.actionButtonsContainer }>
        <Button
          style={{ color: theme.palette.error.main }}
          key="delete"
          variant="text"
          color="inherit"
          onClick={ this.toggleDeleteDialog }
        >
          { strings.generic.delete }
        </Button>
        <Button
          key="renew"
          variant="outlined"
          color="primary"
          onClick={ this.renewClick }
        >
          { strings.items.renew }
        </Button>
        <Button
          key="edit"
          variant="outlined"
          color="primary"
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
    const { item } = this.state;

    return item?.properties ?
      item.properties.map((property, index) => {
        return property.value && (
          <Box key={ index } mb={ 2 }>
            <Typography
              key={ property.key }
              variant="h4"
            >
              { property.key }
            </Typography>
            <Box mt={ 1 } mb={ 1 }>
              <Typography
                key={ property.value }
                variant="body1"
                >
                { property.value }
              </Typography>
            </Box>
          </Box>
        );
      }) :
      [];
  }

  /**
   * Renders properties
   */
  private renderPriceInfo = () => {
    const { item } = this.state;

    if (!item || item.itemType === ItemType.BUY) {
      return null;
    }

    const deliveryText = item.delivery ?
      strings.items.delivery.yes :
      strings.items.delivery.no;

    return (
      <Box mt={ 3 } display="flex">
        <Box mr={ 2 } flex={ 1 }>
          <Typography
            key="deliveryTitle"
            variant="h4"
            >
            { strings.items.delivery.title }
          </Typography>
          <Box mt={ 1 } mb={ 1 }>
            <Typography
              key="deliveryValue"
              variant="body1"
              >
              { deliveryText }
            </Typography>
          </Box>
        </Box>

        { item.delivery &&
          <Box>
            <Typography
              key="priceTitle"
              variant="h4"
            >
              { strings.items.deliveryPrice }
            </Typography>
            <Box mt={ 1 } mb={ 1 }>
              <Typography
                key="priceValue"
                variant="body1"
              >
                { `${item.deliveryPrice}€` || strings.items.deliveryPrice }
              </Typography>
            </Box>
          </Box>
        }
        <Box flex={ 1 }>
          <Typography
            key="paymentMethodTitle"
            variant="h4"
          >
            { strings.items.paymentMethod }
          </Typography>
          <Box mt={ 1 } mb={ 1 }>
            <Typography
              key="paymentMethodValue"
              variant="body1"
            >
              { item.paymentMethod }
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  /**
   * Renders user info
   */
  private renderUserInfo = () => {
    const { classes } = this.props;
    const { publicUser } = this.state;

    return publicUser && (
      <div className={ classes.userInfoContainer }>
        { publicUser.logoUrl &&
          <img
            src={ publicUser.logoUrl }
            alt={ strings.generic.imageAlt }
            className={ classes.image }
          />
        }
        <Box p={ 4 }>
          <Typography variant="body1">
            { publicUser.description }
          </Typography>
        </Box>
      </div>
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
        <Box mr={ 2 }>
          <Typography variant="h4">
            { item.metadata.locationInfo.description }
          </Typography>
        </Box>
        <Typography variant="h5">
          { item.metadata.locationInfo.address }
        </Typography>
      </div>
    );
  }

  /**
   * Renders seller info
   */
  private renderSellerInfo = () => {
    const { item } = this.state;

    if (!item) {
      return null;
    }
    
    return (
      <Box display="flex" mt={ 2 }>
        <Box mb={ 2 } mr={ 2 } flex={ 1 }>
          <Typography variant="h4">
            { strings.items.locationInfo.email }
          </Typography>
          <Box mt={ 1 } mb={ 1 }>
            <Typography variant="body1">
              { item.metadata.locationInfo.email }
            </Typography>
          </Box>
        </Box>
        <Box mb={ 2 } flex={ 1 }>
          <Typography variant="h4">
            { strings.items.locationInfo.phone }
          </Typography>
          <Box mt={ 1 } mb={ 1 }>
            <Typography variant="body1">
              { item.metadata.locationInfo.phone }
            </Typography>
          </Box>
        </Box>
      </Box>
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
      <Box mb={ 6 }>
        <Map
          address={ address }
          coordinates={ coordinates }
          defaultZoomLevel={ 15 }
        />
      </Box>
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
   * Render item update dialog
   */
  private renderItemUpdatedDialog = () => {
    const {
      updateOpen,
      successfulUpdate,
      updateLoading
    } = this.state;

    return (
      <GenericConfirmDialog
        open={ updateOpen }
        loading={ updateLoading }
        success={ successfulUpdate }
        title={ successfulUpdate ?
          strings.generic.saveSuccessful :
          strings.generic.saveError
        }
        confirmButtonText={ strings.generic.proceed }
        cancelButtonText={ strings.generic.close }
        successCloseButtonText={ strings.generic.close }
        successTitle={ strings.items.renewSuccessful }
        onCancel={ this.closeUpdateSuccessDialog }
        onClose={ this.closeUpdateSuccessDialog }
        onConfirm={ this.closeUpdateSuccessDialog }
        onSuccessClose={ this.closeUpdateSuccessDialog }
      />
    );
  }

  /**
   * Closes update success dialog
   */
  private closeUpdateSuccessDialog = () => {
    this.setState({
      updateOpen: !this.state.updateOpen,
    })
  }

  /**
   * Event handler for renew click
   */
  private renewClick = () => {
    this.setState({ updateOpen: true });

    this.updateItem(this.state.item)
    .catch(error => console.error(error));
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
    const usersApi = Api.getUsersApi(anonymousToken);

    const item = await itemsApi.findItem({ itemId });
    const publicUser = await usersApi.findPublicUser({ userId: item.userId });
    this.setState({ item, publicUser });
  }

  /**
   * Updates item in list
   *
   * @param itemToUpdate item to update
   */
  private updateItem = async (itemToUpdate?: Item) => {
    const { signedToken, itemId } = this.props;

    if (!signedToken || !itemToUpdate) {
      return;
    }

    this.setState({ updateLoading: true });
    const itemsApi = Api.getItemsApi(signedToken);
    await itemsApi.updateItem({
      item: itemToUpdate,
      itemId: itemId
    })
    .then(updatedItem => {
      this.setState({
        successfulUpdate: true,
        updateLoading: false,
        item: updatedItem
      });
    })
    .catch(e => console.error(e));
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
    signedToken: state.auth.signedToken,
    locale: state.locale.locale
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
