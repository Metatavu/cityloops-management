import * as React from "react";

import { Dispatch } from "redux";
import { ReduxState, ReduxActions } from "../../store";
import { connect } from "react-redux";

import { AccessToken } from "../../types";
// tslint:disable-next-line: max-line-length
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, GridDirection, GridProps, GridSize, IconButton, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Category, Item, ItemProperty, LocationInfo } from "../../generated/client";
import styles from "../../styles/components/generic/item-form-dialog";
import strings from "../../localization/strings";
import CategoryTree from "./category-tree";
import Api from "../../api/api";
import PropertiesSection from "./properties-section";
import LocationSection from "./location-section";
import produce from "immer";
import classNames from "classnames";
import CloseIcon from '@material-ui/icons/Close';

import testPicture from "../../resources/images/testikuva.jpeg";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: AccessToken;
  open?: boolean;
  onClose?: () => void;
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
      loading: true,
      categories: []
    };
  }

  /**
   * Component did mount life cycle method
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
    const { classes, open, onClose } = this.props;
    const { loading, item } = this.state;

    return (
      <Dialog
        maxWidth="lg"
        fullWidth
        open={ open || false }
        onClose={ onClose && onClose }
        PaperProps={{ className: classes.dialogContainer }}
      >
        <DialogTitle className={ classes.dialogTitle }>
          { strings.items.newPosting }
          <IconButton
            className={ classes.dialogClose }
            onClick={ onClose && onClose }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          className={ classes.dialogContent }
        >
          { loading || !item ?
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
          { this.state.selectedCategory &&
            this.renderItemColumnContent()
          }
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
      return;
    }

    /**
     * TODO:
     * Remove these when actual data is available
     */
    const placeholderImages = [
      testPicture,
      testPicture,
      testPicture
    ];

    return (
      <>
        <Grid
          { ...this.getGridItemProps(12, 6) }
          className={ classes.column }
        >
          <PropertiesSection
            title={ item?.title }
            images={ item?.images || placeholderImages }
            properties={ item?.properties }
            onUpdateTitle={ this.updateTitle }
            onUpdateImages={ this.updateImages }
            onUpdateProperties={ this.updateProperties }
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
    const { classes, existingItem, onClose } = this.props;
    const { loading, selectedCategory } = this.state;

    const disabled = loading || !selectedCategory;
    return (
      <>
        { existingItem ? (
            <Button
              variant="outlined"
              color="primary"
              disabled={ disabled }
              className={ classes.buttonOutlined }
            >
              { strings.generic.clear }
            </Button>
          ) : (
            <Button
              variant="outlined"
              disabled={ disabled }
              className={ classes.buttonOutlined }
              onClick={ this.emptyForm }
            >
              { strings.generic.clear }
            </Button>
          )
        }
        <Button
          variant="outlined"
          className={ classes.buttonOutlined }
          onClick={ onClose && onClose }
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

    const item = existingItem ?? this.createItemStructure();
    const selectedCategory = existingItem ?
      await categoriesApi.findCategory({ categoryId: existingItem!.category! }) :
      undefined;

    this.setState({ item, selectedCategory });
  }

  /**
   * Creates item structure
   *
   * @returns item object
   *
   * TODO:
   * Add logic for default and category-based properties
   */
  private createItemStructure = (): Item => ({
    title: "Uusi ilmoitus",
    metadata: {
      locationInfo: { }
    },
    properties: [
      { key: "korkeus", value: "" },
      { key: "leveys", value: "" },
      { key: "pituus", value: "" },
      { key: "lisätiedot", value: "" }
    ],
    onlyForCompanies: false,
    userId: this.props.signedToken?.userId || "",
    category: this.state.selectedCategory?.id
  });

  /**
   * Sets selected category
   *
   * @param selectedCategory selected category
   */
  private selectCategory = (selectedCategory: Category) => {

    const categoryId = selectedCategory.id;
    if (!categoryId) {
      return;
    }

    this.setState(
      produce((draft: State) => {
        draft.selectedCategory = selectedCategory;
        draft.item!.category = categoryId;
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
      item: { ...this.state.item!, title }
    });
  }

  /**
   * Update item images
   *
   * @param images images
   */
  private updateImages = (images: string[]) => {
    this.setState({
      item: { ...this.state.item!, images }
    });
  }

  /**
   * Update item properties
   *
   * @param properties properties
   */
  private updateProperties = (properties: ItemProperty[]) => {
    this.setState({
      item: { ...this.state.item!, properties }
    });
  }

  /**
   * Update item location info
   *
   * @param locationInfo location info
   */
  private updateLocationInfo = (locationInfo: LocationInfo) => {
    this.setState(
      produce((draft: State) => {
        draft.item!.metadata.locationInfo = locationInfo;
      })
    );
  }

  /**
   * Submits form
   */
  private submitForm = async () => {
    const {
      existingItem,
      signedToken,
      onCreated,
      onUpdated,
      onClose
    } = this.props;
    const { item } = this.state;

    if (!signedToken || !onCreated || !onClose || !item) {
      return;
    }

    this.setState({ loading: true });

    const itemsApi = Api.getItemsApi(signedToken);
    if (existingItem) {
      const itemId = item.id!;
      if (!itemId || !onUpdated) {
        this.setState({ loading: false });
        return;
      }

      const updatedItem = await itemsApi.updateItem({ itemId, item });
      if (!updatedItem) {
        this.setState({ loading: false });
        return;
      }

      onUpdated(updatedItem);
      onClose();
    } else {
      const newItem = await itemsApi.createItem({ item });
      if (!newItem || !onCreated) {
        this.setState({ loading: false });
        return;
      }

      onCreated(newItem);
      onClose();
    }

    this.setState({ loading: false });
  }

  /**
   * Empties form
   */
  private emptyForm = () => {
    this.setState({
      item: {
        ...this.state.item!,
        metadata: {
          locationInfo: { },
          amount: undefined,
          certificates: undefined
        },
        onlyForCompanies: false,
        title: "",
        images: undefined,
        properties: this.emptyProperties(this.state.item!.properties),
        thumbnailUrl: undefined
      }
    });
  }

  /**
   * Empties values of properties in item
   *
   * @param properties properties found from item
   * @returns list of properties if there are any, otherwise undefined
   */
  private emptyProperties = (properties: ItemProperty[] | undefined): ItemProperty[] | undefined => {
    if (!properties) {
      return undefined;
    }

    return properties.length > 0 ?
      properties.map(property => ({ ...property, value: "" })) :
      [];
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
