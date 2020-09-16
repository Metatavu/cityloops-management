import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/main-view";
import { WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken } from '../../types';
import { Item } from "../../generated/client";
import GenericButton from "../generic/generic-button";
import ItemList from "../items/item-list";
import strings from "../../localization/strings";
import Api from "../../api/api";
import produce from "immer";
import ApiOperations from "../../utils/generic-api-operations";
import ModifyOperations from "../../utils/generic-modify-operations";

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
   * Component did mount life cycle handler
   */
  public componentDidMount = () => {
    this.fetchData();
  }

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
   * Component render method
   */
  public render = () => {
    const { itemList } = this.state;
    return (
      <div>
        { /* TODO: Implement basic layout */ }
        { /* <TopBar></TopBar> */ }
        { /* <SearchBar></SearchBar> */ }
        { /* <BreadCrumbs></BreadCrumbs> */ }

      <GenericButton
        text={ strings.items.addItem }
        onClick={ this.onAddItemClick }
      />

      <ItemList
        itemList={ itemList }
        updatePath={ this.updateRoutePath }
      />
      </div>
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
    // TODO: Implement route path update
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
