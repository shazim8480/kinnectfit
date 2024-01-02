"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealPlanName: "",
  mealPlanCategory: "",
  mealPlanDescription: "",
  mealCategory: "",
  mealName: "",
  ingredients: [],
  neutrients: {},
  prepTime: "",

};

export const mealSlice = createSlice({
  name: "mealplan",
  initialState,
  reducers: {
    setMealValues: (state, action) => {
      state, action, action.payload;
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setMealValues } = mealSlice.actions;
export default mealSlice.reducer;
