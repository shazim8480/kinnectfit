"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: "",
  weight: "",
  goalWeight: "",
  selectedGender: "",
  country: "",
  age: "",
  goal: "",
  plan: "",
};

export const userFormSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      state, action, action.payload;
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setFormValues } = userFormSlice.actions;
export default userFormSlice.reducer;
