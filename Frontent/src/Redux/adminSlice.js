import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Axios/adminAxios";
import { toast } from "sonner";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", credentials);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      let errorMessage = "Something went wrong, please try again later.";
      if (error.response && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminToken: localStorage.getItem("adminToken") ?? null,
    loading: false,
    error:null
  },
  reducers: {
    adminLogout: (state) => {
      toast.success("Logout Successful");
      state.adminToken = null
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        const { token } = action.payload;
        state.adminToken = token;
        state.loading = false;
        localStorage.setItem("adminToken", token);
      })
  },
});
export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
