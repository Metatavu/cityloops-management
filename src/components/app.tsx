import * as React from "react";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { ReduxState, ReduxActions, rootReducer } from "../store";
import * as immer from "immer";

import { ThemeProvider } from "@material-ui/styles";
import cityLoopsTheme from "../styles/theme";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import strings from "../localization/strings";
import SignedTokenProvider from "./containers/signed-token-provider";
import AnonymousTokenProvider from "./containers/anonymous-token-provider";
import StoreInitializer from "./containers/store-initializer";
import moment from "moment";
import "moment/locale/fi";
import "moment/locale/en-gb";

import ItemsScreen from "./screens/items-screen";
import ItemScreen from "./screens/item-screen";
import AddItemScreen from "./screens/add-item-screen";
import UsersScreen from "./screens/user-screen";

const store = createStore<ReduxState, ReduxActions, any, any>(rootReducer);

/**
 * Interface representing component properties
 */
interface Props {
}

/**
 * Interface representing component state
 */
interface State {
}

/**
 * Material UI theme with automated responsive font sizes
 */
const theme = responsiveFontSizes(cityLoopsTheme);

/**
 * App component
 */
class App extends React.Component<Props, State> {

  /**
   * Component did mount life cycle component
   */
  public componentDidMount = () => {
    moment.locale(strings.getLanguage());
    immer.enableAllPlugins();
  }

  /**
   * Component render method
   */
  public render = () => {

    return (
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Provider store={ store }>
          <AnonymousTokenProvider>
            <SignedTokenProvider>
              <StoreInitializer>
                <BrowserRouter>
                  <div className="App">
                    <Switch>
                      {/**
                       * TODO:
                       * Remove redirect when front page is done
                       */}
                      <Redirect exact from="/" to="/items" />
                      <Route
                        path="/items"
                        exact={ true }
                        render={({ history }) => (
                          <ItemsScreen
                            history={ history }
                          />
                        )}
                      />
                      <Route
                        path="/item/:id"
                        exact={ true }
                        render={({ history, match }) => (
                          <ItemScreen
                            history={ history }
                            itemId={ match.params.id }
                          />
                        )}
                      />
                      <Route
                        path="/add"
                        exact={ true }
                      >
                        <AddItemScreen/>
                      </Route>
                      <Route
                        path="/user"
                        exact={ true }
                        render={({ history }) => (
                          <UsersScreen
                            history={ history }
                          />
                        )}
                      />
                    </Switch>
                  </div>
                </BrowserRouter>
              </StoreInitializer>
            </SignedTokenProvider>
          </AnonymousTokenProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
