import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { getData, postData,postMethod } from "../../service/http";
// import { setLoading } from "./maps";
// import { AppDispatch } from "../store";
// import { DashboardRes } from "../../types/Dashboard";
import { Dispatch } from "../../Types/login";
import axios from "axios";

// export const dashboardData: any = createAsyncThunk(
//   "dashboardSlice/dashboardData",
//   async (data: any, { dispatch }: Dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await postData(`dashboardcountry`,{},{ country: data });
//       dispatch(setLoading(false));

//       return response;
//     } catch (err) {
//       console.log(err, "api error");
//       dispatch(setLoading(false));
//     }
//   }
// );

export const postLogin: any = createAsyncThunk(
  "loginSlice/postLogin",
  async (data: any, { dispatch }: Dispatch) => {
    try {
      //   dispatch(setLoading(true));
      const response: any = await axios.post(
        "http://localhost:8080/auth/login",
        { email: data?.email, password: data?.password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //   dispatch(setLoading(false));
      dispatch(setLoginRes(response?.data));
      return response;
    } catch (err) {
      console.log(err, "api error");
      //   dispatch(setLoading(false));
    }
  }
);

interface InitialState {
  loginRes: any;
}

const initialState: InitialState = {
  loginRes: [],
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,

  reducers: {
    setLoginRes: (state: any, action: any) => {
      state.loginRes = action.payload;
    },
  },
});
export const { setLoginRes } = loginSlice.actions;

export default loginSlice.reducer;
