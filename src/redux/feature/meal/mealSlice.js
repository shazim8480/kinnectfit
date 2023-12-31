"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealPlanName: "",
  category: "",
  mealCoverImg: "",
  mealDescription: "",
  categories: [
    {
      mealCategory: "",
      meals: [
        {
          mealName: "",
          ingredients: [],
          nutrients: {},
          prep_time: "",
          img: "",
        },
      ],
    },
  ],
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
