
import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice"

const reducers = {
  loginSlice,
};

function createRootReducer(injectedReducers :any = {}) {
  return combineReducers({
    ...injectedReducers,
    ...reducers,
  });
}

export { createRootReducer };
