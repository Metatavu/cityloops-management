import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";
import strings from "../../localization/strings";
import { History } from "history";
import { Tab, Tabs, WithStyles, withStyles, Typography, CircularProgress, Hidden } from "@material-ui/core";
import styles from "../../styles/components/screens/user-screen";
import AppLayout from "../layouts/app-layout";
import { SignedToken } from "../../types";
import UserItemsTab from "../tabs/user-items-tab";
import CategoriesProvider from "../categories/categories-provider";
import SearchHoundsProvider from "../search-hounds/search-hound-provider";
import MyInfoTab from "../tabs/my-info-tab";
import { Item, User } from "../../generated/client";
import Api from "../../api/api";
import ItemFormDialog from "../generic/item-form-dialog";
import produce from "immer";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: SignedToken;
  history: History;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  tabIndex: number;
  existingItem?: Item;
  item?: Item;
  dataChanged: boolean;
  user?: User;
  userItems: Item[];
  formOpen: boolean;
  successDialogOpen: boolean;
}

/**
 * Component for User screen
 */
export class UserScreen extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      tabIndex: 0,
      dataChanged: false,
      formOpen: false,
      userItems: [],
      successDialogOpen: true
    };
  }

  /**
   * Component did mount life cycle method
   */
  public componentDidMount = async () => {
    this.setState({ loading: true });
    await this.fetchUserInformation();
    await this.fetchData();
    this.setState({ loading: false });
  }

  /**
   * Component did update life cycle method
   */
  public componentDidUpdate = async (prevProps: Props) => {
    if (prevProps.signedToken === undefined && this.props.signedToken) {
      this.setState({ loading: true });
      await this.fetchUserInformation();
      await this.fetchData();
      this.setState({ loading: false });
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { formOpen } = this.state;

    return (
      <AppLayout
        banner={ false }
        headerProps={{
          onAddClick: this.onAddItemClick
        }}
      >
        { this.renderLayoutContent() }
        <ItemFormDialog
          open={ formOpen }
          onClose={ () => this.setState({ formOpen: false }) }
          onCreated={ this.addItem }
        />
      </AppLayout>
    );
  }

  /**
   * Renders layout content
   */
  private renderLayoutContent = () => {
    const { classes, signedToken } = this.props;
    const {
      tabIndex,
      userItems,
      user,
      loading
    } = this.state;

    if (!signedToken) {
      return <Typography variant="h4">{ strings.generic.noPermissions }</Typography>;
    }

    if (loading) {
      return (
        <div className={ classes.loaderContainer }>
          <CircularProgress size={ 40 } color="secondary"/>
        </div>
      );
    }

    return (
      <>
        <Hidden smDown>
          <Tabs
            classes={{ indicator: classes.indicator }}
            onChange= { this.setTabIndex }
            value={ tabIndex }
          >
            <Tab label={ strings.userPage.products } value={ 0 }/>
            <Tab label={ strings.userPage.myInfo } value={ 1 }/>
            <Tab label={ strings.userPage.categories } value={ 2 }/>
            <Tab label={ strings.userPage.searchHounds } value={ 3 }/>
          </Tabs>
        </Hidden>
        {/* Mobile tabs */}
        <Hidden mdUp>
          <Tabs
            variant="fullWidth"
            centered
            classes={{ indicator: classes.indicator }}
            onChange= { this.setTabIndex }
            value={ tabIndex }
          >
            <Tab fullWidth label={ strings.userPage.products } value={ 0 }/>
            <Tab fullWidth label={ strings.userPage.myInfo } value={ 1 }/>
            <Tab fullWidth label={ strings.userPage.categories } value={ 2 }/>
            <Tab fullWidth label={ strings.userPage.searchHounds } value={ 3 }/>
          </Tabs>
        </Hidden>

        { tabIndex === 0 &&
          <UserItemsTab
            userItems={ userItems }
            onDeleteItemClick={ this.deleteItem }
          />
        }
        { tabIndex === 1 &&
          <MyInfoTab
            user={ user }
            onUserInfoChange={ this.onUserInfoChange } 
            onUserSave={ this.onUserSave }
          />
        }
        { tabIndex === 2 &&
          <CategoriesProvider signedToken={ signedToken } />
        }
        { tabIndex === 3 &&
          <SearchHoundsProvider signedToken={ signedToken } />
        }
      </>
    );
  }

  /**
   * Adds new item to list
   *
   * @param createdItem created item
   */
  private addItem = (createdItem: Item) => {
    this.setState(
      produce((draft: State) => {
        draft.successDialogOpen = true;
        draft.userItems.unshift(createdItem);
      })
    );
  }

  /**
   * Event handler for user info change
   *
   * @param updatedUser updated user
   */
  private onUserInfoChange = (updatedUser: User) => {
    this.setState({
      user: updatedUser
    });
  }

  /**
   * Event handler for user save
   */
  private onUserSave = async () => {
    const { signedToken } = this.props;
    const { user } = this.state;

    if (!signedToken || !user || !user.id) {
      return;
    }

    const usersApi = Api.getUsersApi(signedToken);
    const updateUser = await usersApi.updateUser({
      userId: user.id,
      user
    });

    this.setState({ user: updateUser });
  }

  /**
   * Event handler for deleting an item
   *
   * @param item item to be deleted
   */
  private deleteItem = async (item: Item) => {
    const { signedToken } = this.props;
    const { userItems } = this.state;

    if (!signedToken || !item.id) {
      return;
    }

    const itemsApi = Api.getItemsApi(signedToken);
    await itemsApi.deleteItem({ itemId: item.id });
    const updatedItemList = userItems.filter(listItem => listItem.id !== item.id);
    this.setState({
      userItems: updatedItemList
    });
  }

  /**
   * Fetches user information
   */
  private fetchUserInformation = async () => {
    const { signedToken } = this.props;

    if (!signedToken || !signedToken.userId) {
      return;
    }

    const usersApi = Api.getUsersApi(signedToken);
    const userId = signedToken.userId;

    const user = await usersApi.findUser({ userId: userId });
    this.setState({ user: user });
  }

  /**
   * Sets tab index
   *
   * @param event event object
   * @param newValue new tab index value
   */
  private setTabIndex = (event: React.ChangeEvent<{ }>, newValue: number) => {
    this.setState({
      tabIndex: newValue
    });
  }

  /**
   * Fetches data from API
   */
  private fetchData = async () => {
    const { signedToken } = this.props;

    if (!signedToken || !signedToken.userId) {
      return;
    }

    const userId = signedToken.userId;
    const itemsApi = Api.getItemsApi(signedToken);
    const items = await itemsApi.listItems({ userId });

    this.setState({
      userItems: items
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserScreen));
