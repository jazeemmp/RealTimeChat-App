import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (crendtials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        crendtials
      );
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
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")) ?? null,
    userToken: localStorage.getItem("token") ?? null,
    loading: false,
  },
  reducers: {
    userLogout: (state) => {
      toast.success("Logout Successful")
      state.userData = null;
      state.userToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const { userData, token } = action.payload;
        state.userData = userData;
        state.userToken = token;
        state.loading = false;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
      })
  },
});
export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
