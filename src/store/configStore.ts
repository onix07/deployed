import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducers } from "reducers";

const initialState = {};

export default createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleWare))
);
