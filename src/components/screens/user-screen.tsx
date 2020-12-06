import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";
import strings from "../../localization/strings";
import { History } from "history";
import { Tab, Tabs, WithStyles, withStyles, Typography, CircularProgress } from "@material-ui/core";
import styles from "../../styles/components/screens/user-screen";
import AppLayout from "../layouts/app-layout";
import { AccessToken } from "../../types";
import UserItemsTab from "../tabs/user-items-tab";
import CategoriesProvider from "../categories/categories-provider";
import MyInfoTab from "../tabs/my-info-tab";
import { Coordinates, Item, User } from "../../generated/client";
import logo from "../../resources/images/toimintakeskus.png";
import Api from "../../api/api";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: AccessToken;
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
      userItems: []
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
    return (
      <AppLayout
        banner={ false }
      >
        { this.renderLayoutContent() }
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
        <img
          className={ classes.logo }
          alt="Company logo"
          src={ logo }
        />
        <Tabs
          classes={{ indicator: classes.indicator }}
          onChange= { this.setTabIndex }
          value={ tabIndex }
        >
          <Tab label={ strings.userPage.products } value={ 0 }/>
          <Tab label={ strings.userPage.myInfo } value={ 1 }/>
          <Tab label={ strings.userPage.categories } value={ 2 }/>
        </Tabs>
        { tabIndex === 0 &&
          <UserItemsTab
            userItems={ userItems }
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
      </>
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