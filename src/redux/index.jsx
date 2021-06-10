import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";
import productReducer from "./reducer/productReducer";
import searchReducer from "./reducer/searchReducer";

let reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  search: searchReducer
});

const middleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState());
  }

  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer, composeEnhancers(applyMiddleware(middleware)));
export default store;
