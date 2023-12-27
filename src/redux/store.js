"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user/userSlice";
import { api } from "./api/apiSlice";
import surveyFormReducer from "./feature/survey/surveySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    surveyForm: surveyFormReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
