import { createStore, combineReducers, applyMiddleware } from "redux";
import stockReducer from "./reducers/stockReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({ stockReducer });

export const store = createStore(reducers, {}, applyMiddleware(thunk));
