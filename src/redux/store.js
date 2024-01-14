"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user/userSlice";
import { api } from "./api/apiSlice";
import surveyFormReducer from "./feature/survey/surveySlice";
import mealPlanReducer from "./feature/meal/mealSlice";
import workoutReducer from "./feature/workout/workoutSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers(
  {
    mealplan: mealPlanReducer,
    workout: workoutReducer,
    user: userReducer,
    surveyForm: surveyFormReducer,
    [api.reducerPath]: api.reducer,
  }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: ['mealplan', 'workout', 'surveyForm']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
