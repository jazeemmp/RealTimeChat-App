import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios/adminAxios";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", credentials);
      return data;
    }catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/all-users");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
);
