import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios/axiosAuth";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (crendtials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", crendtials);
      return data;
    }  catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async(_,{rejectWithValue})=>{
    try {
      const { data } = await axios.get("/my-profile");
      return data;
    }  catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
)