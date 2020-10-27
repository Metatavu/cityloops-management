import * as React from "react";

import { ReduxState, ReduxActions } from "../../store";
import { connect } from "react-redux";

import { AccessToken } from "../../types";
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
  accessToken?: AccessToken;
  onSubmit?: (item: Item) => void;
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
    const { classes } = this.props;

    return (
      <Dialog
        maxWidth="lg"
        fullWidth
        open={ true }
        PaperProps={{ className: classes.dialogContainer }}
      >
        <DialogTitle className={ classes.dialogTitle }>
          <Typography variant="h5">
            { strings.items.newPosting }
          </Typography>
          <IconButton className={ classes.dialogClose }>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          className={ classes.dialogContent }
        >
          { this.state.loading || !this.state.item ?
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
    const { classes, existingItem } = this.props;
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
            >
              { strings.generic.clear }
            </Button>
          )
        }
        <Button
          variant="outlined"
          disabled={ disabled }
          className={ classes.buttonOutlined }
        >
          { strings.generic.cancel }
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          disabled={ disabled }
          className={ classes.buttonContained }
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
    const { accessToken, existingItem } = this.props;

    if (!accessToken) {
      return;
    }

    const categoriesApi = Api.getCategoriesApi(accessToken);
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
      locationInfo: {}
    },
    properties: [
      { key: "korkeus", value: "" },
      { key: "leveys", value: "" },
      { key: "pituus", value: "" },
      { key: "lisätiedot", value: "" }
    ],
    onlyForCompanies: false,
    userId: this.props.accessToken?.userId || ""
  });

  /**
   * Sets selected category
   * 
   * @param selectedCategory selected category
   */
  private selectCategory = (selectedCategory: Category) => {
    this.setState({ selectedCategory });
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
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
const mapStateToProps = (state: ReduxState) => ({
  accessToken: state.auth.accessToken as AccessToken
});

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
const mapDispatchToProps = (dispatch: React.Dispatch<ReduxActions>) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemFormDialog));