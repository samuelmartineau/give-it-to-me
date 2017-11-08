import { createStore, applyMiddleware } from "redux";
import withRedux from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import * as api from "../api";

export const makeStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware.withExtraArgument(api)))
  );
};

export const reduxPage = withRedux(makeStore);

export { getCellar } from "./actions";
