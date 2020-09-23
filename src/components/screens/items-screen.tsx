import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/main-view";
import { WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken } from '../../types';
import { Item } from "../../generated/client";
import ItemList from "../items/item-list";
import strings from "../../localization/strings";
import Api from "../../api/api";
import produce from "immer";
import ApiOperations from "../../utils/generic-api-operations";
import ModifyOperations from "../../utils/generic-modify-operations";
import AppLayout from "../layouts/app-layout";
import BannerImage from "../generic/banner-image";
import bannerImageSrc from "../../resources/images/banner-image.png";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  history: History;
  keycloak: KeycloakInstance;
  accessToken: AccessToken;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  itemList: Item[];
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
      itemList: []
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = () => {
    this.fetchData();
  }

  /**
   * Component render method
   */
  public render = () => {
    const { itemList } = this.state;
    return (
      <AppLayout
        headerProps={{
          onAddClick: this.onAddItemClick
        }}
      >
        { /* TODO: Implement basic layout */ }
        { /* <TopBar></TopBar> */ }
        { /* <SearchBar></SearchBar> */ }
        { /* <BreadCrumbs></BreadCrumbs> */ }
        <BannerImage
          image={ bannerImageSrc }
          title={ strings.items.title }
        />

        <ItemList
          itemList={ itemList }
          updatePath={ this.updateRoutePath }
          deleteItem={ this.deleteItem }
        />
      </AppLayout>
    );
  }

  /**
   * Event handler for add item click
   *
   * TODO: Remove this once we have proper component for adding items
   */
  private onAddItemClick = async () => {
    const { accessToken } = this.props;
    const { itemList } = this.state;

    const categoriesApi = Api.getCategoriesApi(accessToken);
    const itemsApi = Api.getItemsApi(accessToken);

    const categories = await categoriesApi.listCategories({ });
    const category = categories.length > 0 ? categories[0] : undefined;

    if (!category || !category.id) {
      return;
    }

    const newItem: Item = {
      title: "New Item",
      category: category.id,
      metadata: { },
      onlyForCompanies: false
    };

    const createdItem = await itemsApi.createItem({ item: newItem });
    const updatedItemList = ModifyOperations.updateItemList(itemList, createdItem);

    this.setState({
      itemList: updatedItemList
    });
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
   * Event handler for deleting an item
   *
   * @param item item to be deleted
   */
  private deleteItem = async (item: Item) => {
    const { accessToken } = this.props;
    const { itemList } = this.state;

    if (!item.id) {
      return;
    }

    const itemsApi = Api.getItemsApi(accessToken);
    await itemsApi.deleteItem({ itemId: item.id });
    const updatedItemList = itemList.filter(listItem => listItem.id !== item.id);
    this.setState({
      itemList: updatedItemList
    });
  }

  /**
   * Fetch needed data
   */
  private fetchData = async () => {
    const { accessToken } = this.props;

    const itemList = await ApiOperations.listItems(accessToken);
    this.setState(
      produce((draft: State) => {
        draft.itemList = itemList;
      })
    );
  }
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    keycloak: state.auth.keycloak as KeycloakInstance,
    accessToken: state.auth.accessToken as AccessToken,
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
