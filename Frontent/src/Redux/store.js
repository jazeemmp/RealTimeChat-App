import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
import adminReducer from './admin/adminSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer
    }
})
export default store;