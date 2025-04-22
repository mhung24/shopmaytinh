import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";

const reducer = combineReducers({
  ProductSlice,
});

const store = configureStore({
  reducer,
});

export default store;
