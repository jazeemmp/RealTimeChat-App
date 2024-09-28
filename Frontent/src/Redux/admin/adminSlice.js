import { createSlice,} from "@reduxjs/toolkit";
import { toast } from "sonner";
import { adminLogin, fetchUsers } from "./adminThuk";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminToken: localStorage.getItem("adminToken") ?? null,
    users:[],
  },
  reducers: {
    adminLogout: (state) => {
      toast.success("Logout Successful");
      state.adminToken = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(adminLogin.fulfilled, (state, action) => {
      const { token } = action.payload;
      state.adminToken = token;
      localStorage.setItem("adminToken", token);
    })
    .addCase(fetchUsers.fulfilled,(state,action)=>{
      state.users = action.payload.users
    })
  },
});
export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
