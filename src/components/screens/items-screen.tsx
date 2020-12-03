import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/items-screen";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken, SearchParams } from '../../types';
import { Category, Item } from "../../generated/client";
import ItemList from "../items/item-list";
import Api from "../../api/api";
import produce from "immer";
import AppLayout from "../layouts/app-layout";
import ItemFormDialog from "../generic/item-form-dialog";

import materiaalitoriLogo from "../../resources/images/materiaalitori.svg";
import MetsasairilaLogo from "../../resources/images/logo_vaaka_mikkeli-1metsasairila 1.png";
import MTOperations from "../materiaalitori/mt-operations";
import strings from "../../localization/strings";
import CloseIcon from '@material-ui/icons/Close';
import logo from "../../resources/svg/logo-primary.svg";
import SearchBar from "../generic/search-bar";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  history: History;
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: AccessToken;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  formOpen: boolean;
  categories: Category[];
  items: Item[];
  mtToken?: string | null;
  successDialogOpen: boolean;
  itemId?: string;
}

/**
 * Component for items screen
 */
export class ItemsScreen extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      formOpen: false,
      categories: [],
      items: [],
      successDialogOpen: false,
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
    this.setState({ loading: true });
    await this.fetchData();
    this.setState({ loading: false })
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes } = this.props;
    const {
      categories,
      items,
      formOpen,
      loading
    } = this.state;

    if (loading) {
      return (
        <AppLayout
          banner={ true }
          headerProps={{
            onAddClick: this.onAddItemClick
          }}
          mobileDrawerProps={{
            logoUrl: MetsasairilaLogo,
            title: "Metsäsairila"
          }}
        >
          <SearchBar
            categories={ categories }
            onSearch={ this.onSearch }
          />
          <div className={ classes.loader }>
            <CircularProgress size={ 40 } color="secondary" />
          </div>
        </AppLayout>
      );
    }

    return (
      <AppLayout
        banner={ true }
        headerProps={{
          onAddClick: this.onAddItemClick
        }}
        mobileDrawerProps={{
          logoUrl: MetsasairilaLogo,
          title: "Metsäsairila"
        }}
      >
        <SearchBar
          categories={ categories }
          onSearch={ this.onSearch }
        />
        <ItemList
          title={ strings.items.latest }
          itemList={ items }
          updatePath={ this.updateRoutePath }
        />
        <ItemFormDialog
          open={ formOpen }
          onClose={ () => this.setState({ formOpen: false }) }
          onCreated={ this.addItem }
          onUpdated={ this.updateItem }
        />
        { this.renderSuccessDialog() }
      </AppLayout>
    );
  }

  /**
   * Render item add success dialog
   * TODO: Add error message logic
   */
  private renderSuccessDialog = () => {
    const { classes } = this.props;
    const { successDialogOpen, itemId } = this.state;

    return (
      <Dialog
        maxWidth="xs"
        fullWidth
        open={ successDialogOpen }
        onClose={ () => this.setState({ successDialogOpen: false }) }
      >
        <DialogTitle className={ classes.dialogTitle }>
          <IconButton
            className={ classes.dialogClose }
            onClick={ () => this.setState({ successDialogOpen: false }) }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={ classes.dialogContent }>
        <img
          src={ logo }
          alt={ "logo" }
          className={ classes.logo }
        />
        <Typography className={ classes.contentTitle }>
          { strings.items.addSuccessful }
        </Typography>
        </DialogContent>
        <DialogActions className={ classes.dialogActions }>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            fullWidth
            className={ classes.submitButton }
            onClick={ () => window.location.href = itemId ? `/item/${itemId}` : "/" }
          >
            { strings.items.navigateToItem }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /**
   * Performs search from our API and Materiaalitori API
   *
   * @param searchParams given search parameters 
   */
  private onSearch = async (searchParams: SearchParams) => {
    const { anonymousToken } = this.props;

    if (!anonymousToken) {
      return;
    }

    this.setState({ loading: true });

    const categoryId = searchParams.category?.id;
    const itemsApi = Api.getItemsApi(anonymousToken);
    const mtResponse = await MTOperations.listItems(searchParams);
    const [ items, mtItems ] = await Promise.all<Item[], Item[]>([
      itemsApi.listItems({ categoryId: categoryId }),
      this.constructMTItems(mtResponse)
    ]);

    this.setState(
      produce((draft: State) => {
        draft.items = [ ...items, ...mtItems ];
        draft.loading = false;
      })
    );
  }

  /**
   * Event handler for update route path
   *
   * @param item clicked item
   */
  private updateRoutePath = (item: Item) => {
    const { history } = this.props;
    if (!item.id) {
      return;
    }

    history.push(`/item/${item.id}`);
  }

  /**
   * Adds new item to list
   *
   * @param item new item
   */
  private addItem = (createdItem: Item) => {
    this.setState(
      produce((draft: State) => {
        draft.items.unshift(createdItem);
        draft.successDialogOpen = true;
        draft.itemId = createdItem.id;
      })
    );
  }

  /**
   * Updates item in list
   *
   * @param item updated item
   */
  private updateItem = (updatedItem: Item) => {
    this.setState(
      produce((draft: State) => {
        draft.items.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        );
      })
    );
  }

  /**
   * Event handler for deleting an item
   *
   * @param item item to be deleted
   */
  private deleteItem = async (item: Item) => {
    const { signedToken } = this.props;
    const { items } = this.state;

    if (!signedToken || !item.id) {
      return;
    }

    const itemsApi = Api.getItemsApi(signedToken);
    await itemsApi.deleteItem({ itemId: item.id });
    const updatedItemList = items.filter(listItem => listItem.id !== item.id);
    this.setState({
      items: updatedItemList
    });
  }

  /**
   * Fetch needed data
   */
  private fetchData = async () => {
    const { anonymousToken } = this.props;

    if (!anonymousToken) {
      return;
    }

    const itemsApi = Api.getItemsApi(anonymousToken);
    const categoriesApi = Api.getCategoriesApi(anonymousToken);
    const mtResponse = await MTOperations.listItems({ });

    const [ categories, items, mtItems ] = await Promise.all<Category[], Item[], Item[]>([
      categoriesApi.listCategories({}),
      itemsApi.listItems({ }),
      this.constructMTItems(mtResponse)
    ]);
    this.setState(
      produce((draft: State) => {
        draft.items = [ ...items, ...mtItems ];
        draft.categories = categories;
      })
    );
  }

  /**
   * Construct MT items
   *
   * @param response response from MT API endpoint
   * @returns promise with list of items
   */
  private constructMTItems = async (response: Response): Promise<Item[]> => {
    const mtItems: any[] = await response.json();
    const items: Item[] = [];

			mtItems.forEach(item => {
				const newItem: Item = {
					id: item.id,
					title: item.title,
					metadata: {
						locationInfo: { }
					},
					properties: [
					],
					images: [
						materiaalitoriLogo
					],
					onlyForCompanies: false,
					userId: "materiaalitori",
					category: item.rfoType
				};
				items.push(newItem);
      });

    /**
     * TODO: We will need some indexing functionality for MT items. This is because
     * MT requires continuationtoken for fetching items (this token is refreshed on each get request)
     * and the API only returns 20 items at a time. So for example getting items 60-80 is
     * impossible without first getting the previous continuationtokens.
     */
    // const token = response.headers.get("continuationtoken");
    // this.setState({
    //   mtToken: token
    // });

		return items;
  }

  /**
   * Event handler for add item click
   */
  private onAddItemClick = () => {
    this.setState({ formOpen: true });
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsScreen));
