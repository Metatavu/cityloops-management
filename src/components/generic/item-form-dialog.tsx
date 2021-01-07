import * as React from "react";

import { Dispatch } from "redux";
import { ReduxState, ReduxActions } from "../../store";
import { connect } from "react-redux";
import { SignedToken } from "../../types";
// tslint:disable-next-line: max-line-length
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, GridDirection, GridProps, GridSize, IconButton, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Category, Item, ItemProperty, LocationInfo, User } from "../../generated/client";
import styles from "../../styles/components/generic/item-form-dialog";
import strings from "../../localization/strings";
import CategoryTree from "./category-tree";
import Api from "../../api/api";
import PropertiesSection from "./properties-section";
import LocationSection from "./location-section";
import produce from "immer";
import classNames from "classnames";
import CloseIcon from "@material-ui/icons/Close";
import { getPresignedPostData, uploadFileToS3 } from "../../utils/image-upload";
import MapFunctions from "../../utils/map-functions";
import GenericConfirmDialog from "./generic-confirm-dialog";
import OutlinedTextField from "../generic/outlined-text-field";
import OutlinedSelect from "../generic/outlined-select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: SignedToken;
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
  mounted: boolean;
  loading: boolean;
  item?: Item;
  categories: Category[];
  selectedCategory?: Category;
  categoryToChange?: Category;
  dataChanged: boolean;
  user?: User;
  changeCategoryConfirmOpen: boolean;
  closeFormConfirmOpen: boolean;
}

/**
 * Item form dialog component
 */
class ItemFormDialog extends React.Component<Props, State> {

  /**
   * Component constructor
   *
   * @param props component props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      mounted: false,
      loading: true,
      categories: [],
      dataChanged: false,
      changeCategoryConfirmOpen: false,
      closeFormConfirmOpen: false
    };
  }

  /**
   * Component did mount life cycle method
   */
  public componentDidMount = async () => {
    this.setState({ mounted: true });
    if (this.props.signedToken) {
      try {
        await this.fetchData();
        await this.fetchUserInformation();
      } catch (e) {
        console.error(`Error fetching data for ItemFormDialog: ${e}`);
      }

      this.setState({ loading: false });
    }
  }

  /**
   * Component did update life cycle method
   * 
   * @param prevProps component properties from previous component state
   */
  public componentDidUpdate = async (prevProps: Props) => {
    if (prevProps.signedToken === undefined && this.props.signedToken) {
      this.setState({ loading: true });

      try {
        await this.fetchData();
        await this.fetchUserInformation();
      } catch (e) {
        console.error(`Error fetching data for ItemFormDialog: ${e}`);
      }

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
      <>
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
        { this.renderCloseFormConfirmDialog() }
        { this.renderCategoryChangeConfirmDialog() }
      </>
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
          { this.renderPriceInfo(item) }
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
   * Renders price info
   *
   * @param item selected item
   */
  private renderPriceInfo = (item: Item) => {
    const { classes } = this.props;

    return (
      <>
        <OutlinedTextField
          key={ `item-${item.id}-price` }
          label={ strings.items.price }
          value={ item.price || "" }
          onChange={ this.updateItemData }
          type="string"
          name="price"
          className={ classes.marginTop }
        />
        <OutlinedTextField
          key={ `item-${item.id}-priceUnit` }
          label={ strings.items.priceUnit }
          value={ item.priceUnit || "" }
          onChange={ this.updateItemData }
          type="string"
          name="priceUnit"
          className={ classes.marginTop }
        />
        <OutlinedTextField
          key={ `item-${item.id}-paymentMethod` }
          label={ strings.items.paymentMethod }
          value={ item.paymentMethod || "" }
          onChange={ this.updateItemData }
          type="string"
          name="paymentMethod"
          className={ classes.marginTop }
        />
        <Typography className={ classes.marginTop }>
          { strings.items.delivery.title }
        </Typography>
        <div style={{ display: "flex" }}>
          <OutlinedSelect
            key={ `item-${item.id}-delivery` }
            name="delivery"
            label={ strings.items.delivery.title }
            value={ item.delivery }
            onChange={ this.onDeliveryOptionChange }
            className={ classes.marginRight }
          >
            <MenuItem key={ strings.generic.yes } value={ "true" }>
              { strings.generic.yes }
            </MenuItem>
            <MenuItem key={ strings.generic.no } value={ "false" }>
              { strings.generic.no }
            </MenuItem>
          </OutlinedSelect>
          { item.delivery &&
            <OutlinedTextField
              key={ `item-${item.id}-deliveryPrice` }
              label={ strings.items.deliveryPrice }
              value={ item.deliveryPrice || "" }
              onChange={ this.updateItemData }
              type="number"
              name="deliveryPrice"
              className={ classes.marginTop }
              disabled={ !item.delivery }
            />
          }
        </div>
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
          onClick={ this.closeForm }
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
          { existingItem ? strings.generic.save : strings.items.addItem }
        </Button>
      </>
    );
  }

  /**
   * Renders close form confirm dialog
   */
  private renderCloseFormConfirmDialog = () => {
    const { closeFormConfirmOpen } = this.state;

    return (
      <GenericConfirmDialog
        title={ strings.generic.dataChanged }
        open={ closeFormConfirmOpen }
        onConfirm={ this.closeForm }
        onCancel={ () => this.toggleCloseFormConfirmDialog(false) }
        onClose={ () => this.toggleCloseFormConfirmDialog(false) }
      />
    );
  }

  /**
   * Renders category change confirm dialog
   */
  private renderCategoryChangeConfirmDialog = () => {
    const { changeCategoryConfirmOpen, categoryToChange } = this.state;
    return (
      <GenericConfirmDialog
        title={ strings.generic.dataChanged }
        open={ changeCategoryConfirmOpen }
        onConfirm={ () => {
          if (categoryToChange) {
            this.selectCategory(categoryToChange);
          }
        }}
        onCancel={ () => this.toggleChangeCategoryConfirmDialog(false) }
        onClose={ () => this.toggleChangeCategoryConfirmDialog(false) }
      />
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
   * 
   * @returns Promise of successful fetch
   */
  private fetchData = async (): Promise<void> => {
    const { signedToken, existingItem } = this.props;

    if (!signedToken) {
      return Promise.reject("No signed token");
    }

    try {
      const categoriesApi = Api.getCategoriesApi(signedToken);
      const categories = await categoriesApi.listCategories({ });

      this.setState({ categories });

      const item = existingItem;
      const selectedCategory = existingItem ?
        await categoriesApi.findCategory({ categoryId: existingItem!.category! }) :
        undefined;

      this.setState({ item, selectedCategory });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Fetches user information
   * 
   * @returns Promise of successful fetch
   */
  private fetchUserInformation = async (): Promise<void> => {
    const { signedToken } = this.props;

    if (!signedToken || !signedToken.userId) {
      return Promise.reject("No signed token or token does not contain user id");
    }

    try {
      const usersApi = Api.getUsersApi(signedToken);
      const user = await usersApi.findUser({ userId: signedToken.userId });
  
      this.setState({ user });
    } catch (e) {
      return Promise.reject(e);
    }
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
    const { user } = this.state;

      category.properties?.forEach(property => {
        properties.push({ key: property.name, value: property.defaultValue || "" });
      });

      if (!properties.find(property => property.key === "Lisätiedot")) {
        properties.push({
          key: "Lisätiedot",
          value: ""
        });
      }
      

    return {
      title: "Uusi ilmoitus",
      metadata: {
        locationInfo: {
          address: user?.address,
          phone: user?.phoneNumber,
          email: user?.email,
        },
      },
      price: 0.0,
      priceUnit: "€",
      properties: properties,
      onlyForCompanies: false,
      userId: this.props.signedToken?.userId || "",
      category: category?.id,
      delivery: false,
      paymentMethod: strings.items.paymentMethod,
      expired: false
    };
  }

  /**
   * Sets selected category
   *
   * @param selectedCategory selected category
   */
  private selectCategory = (selectedCategory: Category) => {
    const { dataChanged, changeCategoryConfirmOpen } = this.state;

    if (dataChanged && !changeCategoryConfirmOpen) {
      this.toggleChangeCategoryConfirmDialog(true, selectedCategory);
      return;
    }

    this.toggleChangeCategoryConfirmDialog(false, undefined);
    const categoryId = selectedCategory.id;
    if (!categoryId) {
      return;
    }

    const newItem = this.createItemStructure(selectedCategory);

    this.setState(
      produce((draft: State) => {
        draft.selectedCategory = selectedCategory;
        draft.item = newItem;
        draft.dataChanged = false;
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
   * Update item data
   *
   * @param event react change event
   */
  private updateItemData = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { item } = this.state;
    const { name, value } = event.target;
    if (!name || !item) {
      return;
    }

    this.setState({
      dataChanged: true,
      item: { ...item, [name]: value }
    });
  }

  /**
   * Event handler for delivery option change
   *
   * @param event react change event
   * @param child child node
   */
  private onDeliveryOptionChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => {
    const { item } = this.state;

    const name = event.target.name;
    const selectValue = event.target.value as string;

    if (!name || !item) {
      return;
    }

    const value = selectValue === "true" ? true : false;
    const itemToUpdate = { ...item, [name]: value };

    if (value) {
      itemToUpdate.deliveryPrice = 0.0;
    }

    this.setState({
      dataChanged: true,
      item: itemToUpdate
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

    if (!previousLocationInfo?.coordinates) {
      locationInfo.coordinates = MapFunctions.defaultCoordinates;
    }

    if (previousLocationInfo?.address !== locationInfo.address) {
      const response = await MapFunctions.fetchNewCoordinatesForAddress(locationInfo.address);
      const parsedCoordinates = await MapFunctions.parseCoordinates(response);
      locationInfo.coordinates = parsedCoordinates;
    }

    this.setState(
      produce((draft: State) => {
        draft.dataChanged = true;
        draft.item!.metadata.locationInfo = locationInfo;
      })
    );
  }

  /**
   * Closes form
   */
  private closeForm = () => {
    const { dataChanged, closeFormConfirmOpen } = this.state;
    if (dataChanged && !closeFormConfirmOpen) {
      this.toggleCloseFormConfirmDialog(true);
      return;
    }

    this.toggleCloseFormConfirmDialog(false);
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

  /**
   * Toggles close form confirm dialog
   * 
   * @param open open
   */
  private toggleCloseFormConfirmDialog = (open: boolean) => {
    this.setState({ closeFormConfirmOpen: open });
  }

  /**
   * Toggles change category confirm dialog
   * 
   * @param open open
   * @param category possible category
   */
  private toggleChangeCategoryConfirmDialog = (open: boolean, category?: Category) => {
    this.setState({
      changeCategoryConfirmOpen: open,
      categoryToChange: category
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
