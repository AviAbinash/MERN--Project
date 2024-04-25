import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { getData, postData,postMethod } from "../../service/http";
// import { setLoading } from "./maps";
// import { AppDispatch } from "../store";
// import { DashboardRes } from "../../types/Dashboard";
import { Dispatch } from "../../Types/login";
import axios from "axios";
import { useDispatch } from "react-redux";

export const postSignUp: any = createAsyncThunk(
  "signupSlice/postSignUp",
  async (data: any, { dispatch }: any) => {
    try {
      //   dispatch(setLoading(true));
      const response: any = await axios.post(
        "http://localhost:8080/auth/register",
        {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
          phoneNumber: data?.phoneNumber,
          password: data?.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response");
      dispatch(setRegister(response?.data))
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      return response;
    } catch (err) {
      console.log(err, "api error");
      //   dispatch(setLoading(false));
    }
  }
);

export const verifyOtp: any = createAsyncThunk(
  "signupSlice/verifyOtp",
  async (data: any, { dispatch }: Dispatch) => {
    try {
      //   dispatch(setLoading(true));
      const response: any = await axios.post(
        "http://localhost:8080/auth/verify",
        {
          otp: data?.otp,
          email: data?.email,
          isRegister: data.isRegister,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //   dispatch(setLoading(false));
      return response;
    } catch (err) {
      console.log(err, "api error");
      //   dispatch(setLoading(false));
    }
  }
);

interface InitialState {
  signupRes: any;
}

const initialState: InitialState = {
  signupRes: null,
};

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,

  reducers: {
    setRegister: (state, action) => {
      state.signupRes = action.payload;
    },
  },
});

export const { setRegister } = signupSlice.actions;
export default signupSlice.reducer;
