import * as React from "react";

import { Dispatch } from "redux";
import { ReduxState, ReduxActions } from "../../store";
import { connect } from "react-redux";
import { AccessToken, OSMData } from "../../types";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, GridDirection, GridProps, GridSize, IconButton, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Category, Coordinates, Item, ItemProperty, LocationInfo, User } from "../../generated/client";
import styles from "../../styles/components/generic/item-form-dialog";
import strings from "../../localization/strings";
import CategoryTree from "./category-tree";
import Api from "../../api/api";
import PropertiesSection from "./properties-section";
import LocationSection from "./location-section";
import produce from "immer";
import classNames from "classnames";
import CloseIcon from '@material-ui/icons/Close';
import { getPresignedPostData, uploadFileToS3 } from "../../utils/image-upload";
import { askConfirmation } from "../../utils/generic-utils";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: AccessToken;
  open?: boolean;
  onClose: () => void;
  onCreated?: (item: Item) => void;
  onUpdated?: (item: Item) => void;
  existingItem?: Item;
}

/**
 * Interface describing component state
 */
interface State {
  loading: boolean;
  item?: Item;
  categories: Category[];
  selectedCategory?: Category;
  dataChanged: boolean;
  user?: User;
}

/**
 * Item form dialog component
 */
class ItemFormDialog extends React.Component<Props, State> {

  /**
   * Base path for Open Street Maps address search API
   */
  private osmAddressBasePath = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon_svg=1&namedetails=1&countrycodes=fi&q=";

  /**
   * Component constructor
   *
   * @param props component props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
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
    await this.fetchData();
    await this.fetchUserInformation();
    this.setState({ loading: false });
  }

  /**
   * Component did update life cycle method
   */
  public componentDidUpdate = async (prevProps: Props) => {
    if (prevProps.signedToken === undefined && this.props.signedToken) {
      this.setState({ loading: true });
      await this.fetchData();
      await this.fetchUserInformation();
      this.setState({ loading: false });
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes, open, onClose } = this.props;
    const { loading } = this.state;

    return (
      <Dialog
        maxWidth="lg"
        fullWidth
        open={ open || false }
        onClose={ onClose }
        PaperProps={{ className: classes.dialogContainer }}
      >
        <DialogTitle className={ classes.dialogTitle }>
          { strings.items.newPosting }
          <IconButton
            className={ classes.dialogClose }
            onClick={ onClose }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          className={ classes.dialogContent }
        >
          { loading ?
            <CircularProgress size={ 60 } className={ classes.loader } /> :
            this.renderDialogContent()
          }
        </DialogContent>
        <DialogActions className={ classes.dialogActions }>
          { this.renderActionButtons() }
        </DialogActions>
      </Dialog>
    );
  }

  /**
   * Renders dialog content
   */
  private renderDialogContent = () => {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={ 0 }
        className={ classes.gridRoot }
      >
        <Grid
          { ...this.getGridItemProps(12, 3) }
          className={ classNames(classes.column, classes.columnDivider) }
        >
          { this.renderCategoryColumnContent() }
        </Grid>
        <Grid
          { ...this.getGridContainerProps() }
          { ...this.getGridItemProps(12, 9) }
        >
            { this.renderItemColumnContent() }
        </Grid>
      </Grid>
    );
  }

  /**
   * Renders category column content
   */
  private renderCategoryColumnContent = () => {
    const { existingItem } = this.props;
    const { categories, selectedCategory } = this.state;

    return (
      <>
        <Typography variant="h6">
          { strings.addItem.chooseCategory }
        </Typography>
        <CategoryTree
          disabled={ !!existingItem }
          onSelect={ this.selectCategory }
          categories={ categories }
          selected={ selectedCategory }
        />
      </>
    );
  }

  /**
   * Renders item column content
   */
  private renderItemColumnContent = () => {
    const { classes } = this.props;
    const { item } = this.state;

    if (!item) {
      return (
        <Typography
          variant="h4"
          style={{ margin: "auto" }}
        >
          { strings.addItem.chooseCategoryInstructions }
        </Typography>
      );
    }

    return (
      <>
        <Grid
          { ...this.getGridItemProps(12, 6) }
          className={ classes.column }
        >
          <PropertiesSection
            title={ item?.title }
            images={ item?.images || [] }
            properties={ item?.properties }
            onUpdateTitle={ this.updateTitle }
            onUpdateImages={ this.updateImages }
            onUpdateProperties={ this.updateProperties }
            onImageDeleteClick={ this.onImageDelete }
          />
        </Grid>
        <Grid
          { ...this.getGridItemProps(12, 6) }
          className={ classes.column }
        >
          <LocationSection
            locationInfo={ item.metadata.locationInfo! }
            onUpdate={ this.updateLocationInfo }
          />
        </Grid>
      </>
    );
  }

  /**
   * Renders action buttons
   */
  private renderActionButtons = () => {
    const { classes, existingItem } = this.props;
    const { loading, selectedCategory } = this.state;

    const disabled = loading || !selectedCategory;
    return (
      <>
        { existingItem &&
          <Button
            variant="outlined"
            color="primary"
            disabled={ disabled }
            className={ classes.buttonOutlined }
          >
            { strings.generic.clear }
          </Button>
        }
        <Button
          variant="outlined"
          className={ classes.buttonOutlined }
          onClick={ this.onCloseFormClick }
        >
          { strings.generic.cancel }
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          disabled={ disabled }
          className={ classes.buttonContained }
          onClick={ this.submitForm }
        >
          { strings.generic.save }
        </Button>
      </>
    );
  }

  /**
   * Method for setting container related props to grid components
   *
   * @param direction flex direction
   * @returns grid properties
   */
  private getGridContainerProps = (direction?: GridDirection): GridProps => ({
    container: true,
    direction: direction || "row"
  });

  /**
   * Method for setting item related props to grid components
   *
   * @param xs sizing for xs breakpoint
   * @param md sizing for md breakpoint
   * @returns grid properties
   */
  private getGridItemProps = (xs?: boolean | GridSize, md?: boolean | GridSize): GridProps => ({
    item: true,
    xs,
    md
  });

  /**
   * Fetches component data
   */
  private fetchData = async () => {
    const { signedToken, existingItem } = this.props;

    if (!signedToken) {
      return;
    }

    const categoriesApi = Api.getCategoriesApi(signedToken);
    const categories = await categoriesApi.listCategories({ });

    this.setState({ categories });

    const item = existingItem;
    const selectedCategory = existingItem ?
      await categoriesApi.findCategory({ categoryId: existingItem!.category! }) :
      undefined;

    this.setState({ item, selectedCategory });
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
   * Creates item structure
   *
   * @returns item object
   *
   * TODO:
   * Add logic for default and category-based properties
   */
  private createItemStructure = (category: Category): Item => {
    const properties: ItemProperty[] = [];
    const { user } = this.state
    
      category.properties?.forEach(property => {
        properties.push({ key: property.name, value: property.defaultValue || "" });
      });

    return {
      title: "Uusi ilmoitus",
      metadata: {
        locationInfo: {
          address: user?.address,
          phone: user?.phoneNumber,
          email: user?.email,
        },
      },
      price: 0,
      priceUnit: "€",
      properties: properties,
      onlyForCompanies: false,
      userId: this.props.signedToken?.userId || "",
      category: category?.id,
      price: 0.0,
      priceUnit: "€"
    };
  }

  /**
   * Sets selected category
   *
   * @param selectedCategory selected category
   */
  private selectCategory = (selectedCategory: Category) => {
    const { dataChanged } = this.state;

    if (dataChanged && !askConfirmation(strings.generic.dataChanged)) {
      return;
    }

    const categoryId = selectedCategory.id;
    if (!categoryId) {
      return;
    }

    const newItem = this.createItemStructure(selectedCategory);

    this.setState(
      produce((draft: State) => {
        draft.selectedCategory = selectedCategory;
        draft.item = newItem;
      })
    );
  }

  /**
   * Updates item title
   *
   * @param title title
   */
  private updateTitle = (title: string) => {
    this.setState({
      dataChanged: true,
      item: { ...this.state.item!, title }
    });
  }

  /**
   * Update item images
   *
   * @param files image files
   */
  private updateImages = async (files: File[]) => {
    const { item } = this.state;

    if (!item) {
      return;
    }

    const newImages = await this.uploadImages(files);
    const updatedImageList = [ ...item.images || [], ...newImages ] as string[];

    this.setState({
      dataChanged: true,
      item: { ...item, images: updatedImageList }
    });
  }

  /**
   * Event handler for image delete
   *
   * @param imageToDelete image to delete from item 
   */
  private onImageDelete = (imageToDelete: string) => {
    const { item } = this.state;
    if (!item || !item.images) {
      return;
    }

    const updatedImageList = produce(item.images, draft => {
      const imageIndex = draft.findIndex(image => image === imageToDelete);
      if (imageIndex > -1) {
        draft.splice(imageIndex, 1);
      }
    });

    this.setState({
      dataChanged: true,
      item: { ...item, images: updatedImageList }
    });

  }

  /**
   * Update item properties
   *
   * @param properties properties
   */
  private updateProperties = (properties: ItemProperty[]) => {
    this.setState({
      dataChanged: true,
      item: { ...this.state.item!, properties }
    });
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
   * Event handler for close form click
   */
  private onCloseFormClick = () => {
    const { dataChanged } = this.state;
    if (dataChanged && !askConfirmation(strings.generic.dataChanged)) {
      return;
    }
    this.emptyForm();
    this.props.onClose();
  }

  /**
   * Submits form
   */
  private submitForm = async () => {
    const { existingItem } = this.props;

    this.setState({ loading: true });

    if (existingItem) {
      this.updateItem();
    } else {
      this.createItem();
    }

    this.setState({
      loading: false,
      dataChanged: false
    });
  }

  /**
   * Uploads images to AWS S3
   *
   * @param files list of files to upload
   */
  private uploadImages = async (files: File[]) => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return [];
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      try {
        const res = await getPresignedPostData(file, signedToken.userId!);
        await uploadFileToS3(res.data, file);
        const imageUrl = `${res.basePath}/${res.data.fields.key}`;
        imageUrls.push(imageUrl);
      } catch (e) {
        //TODO: Proper error handling
      }
    }

    return imageUrls;
  }

  /**
   * Update existing item to API
   */
  private updateItem = async () => {
    const {
      signedToken,
      onUpdated,
      onClose
    } = this.props;
    const { item } = this.state;

    if (!signedToken || !item || !onClose || !onUpdated) {
      return;
    }

    const itemsApi = Api.getItemsApi(signedToken);
    const itemId = item.id!;
    if (!itemId) {
      return;
    }

    const updatedItem = await itemsApi.updateItem({ itemId, item });
    if (!updatedItem) {
      this.setState({ loading: false });
      return;
    }

    onUpdated(updatedItem);
    onClose();
  }

  /**
   * Create new item to API
   */
  private createItem = async () => {
    const {
      signedToken,
      onCreated,
      onClose
    } = this.props;
    const { item } = this.state;

    if (!signedToken || !item || !onClose || !onCreated) {
      return;
    }

    const itemsApi = Api.getItemsApi(signedToken);

    const newItem = await itemsApi.createItem({ item });
    if (!newItem) {
      return;
    }

    onCreated(newItem);
    onClose();
  }

  /**
   * Empties form
   */
  private emptyForm = () => {
    this.setState({
      item: undefined,
      selectedCategory: undefined,
      dataChanged: false
    });
  }
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
const mapStateToProps = (state: ReduxState) => ({
  signedToken: state.auth.signedToken
});

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
const mapDispatchToProps = (dispatch: Dispatch<ReduxActions>) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemFormDialog));
