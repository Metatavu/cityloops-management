import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/items-screen";
import { WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken } from '../../types';
import { Item } from "../../generated/client";
import ItemList from "../items/item-list";
import Api from "../../api/api";
import produce from "immer";
import ApiOperations from "../../utils/generic-api-operations";
import AppLayout from "../layouts/app-layout";
import ItemFormDialog from "../generic/item-form-dialog";

import MetsasairilaLogo from "../../resources/images/logo_vaaka_mikkeli-1metsasairila 1.png";
import MTOperations from "../materiaalitori/mt-operations";

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
      formOpen: false,
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
    const { itemList, formOpen } = this.state;

    return (
      <AppLayout
        headerProps={{
          onAddClick: this.onAddItemClick
        }}
        mobileDrawerProps={{
          logoUrl: MetsasairilaLogo,
          title: "Metsäsairila"
        }}
      >
        { /* TODO: Implement basic layout */ }
        { /* <TopBar></TopBar> */ }
        { /* <SearchBar></SearchBar> */ }
        { /* <BreadCrumbs></BreadCrumbs> */ }
        <ItemList
          itemList={ itemList }
          updatePath={ this.updateRoutePath }
          deleteItem={ this.deleteItem }
        />
        <ItemFormDialog
          open={ formOpen }
          onClose={ () => this.setState({ formOpen: false }) }
          onCreated={ this.addItem }
          onUpdated={ this.updateItem }
        />
      </AppLayout>
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
        draft.itemList.push(createdItem);
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
        draft.itemList.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        )
      })
    )
  }

  /**
   * Event handler for deleting an item
   *
   * @param item item to be deleted
   */
  private deleteItem = async (item: Item) => {
    const { signedToken } = this.props;
    const { itemList } = this.state;

    if (!signedToken || !item.id) {
      return;
    }

    const itemsApi = Api.getItemsApi(signedToken);
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
    const { anonymousToken } = this.props;

    if (!anonymousToken) {
      return;
    }

    const itemList = await ApiOperations.listItems(anonymousToken);
    const mtItems = await MTOperations.listItems();
    this.setState(
      produce((draft: State) => {
        draft.itemList = [ ...itemList, ...mtItems ];
      })
    );
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
