import { combineReducers } from "redux";
import { authReducer } from "../reducers/auth";
import { AuthAction } from "../actions/auth";
import { localeReducer } from "../reducers/locale";
import { LocaleAction } from "../actions/locale";

/**
 * Root reducer that wraps all Redux reducers
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  locale: localeReducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export type ReduxActions = AuthAction | LocaleAction;
