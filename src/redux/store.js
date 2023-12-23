"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user/userSlice";
import { api } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
