import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../components/features/auth/authSlice";



export const store = configureStore({
    reducer: {
        auth:authSlice,
    }
})