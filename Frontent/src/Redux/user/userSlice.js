import { createSlice} from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getProfile, userLogin } from "./userThunk";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    userToken: localStorage.getItem("token") ?? null,
  },
  reducers: {
    userLogout: (state) => {
      toast.success("Logout Successful");
      state.userData = null;
      state.userToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        const { userData, token } = action.payload;
        state.userData = userData;
        state.userToken = token;
        state.loading = false;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { userDetails } = action.payload;
        console.log(userDetails);
        state.userData = userDetails;
      });
  },
});
export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
