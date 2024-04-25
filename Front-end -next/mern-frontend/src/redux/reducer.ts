
import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice"
import signupSlice from "./slices/signupSlice"
const reducers = {
  loginSlice,
  signupSlice
};

function createRootReducer(injectedReducers :any = {}) {
  return combineReducers({
    ...injectedReducers,
    ...reducers,
  });
}

export { createRootReducer };
