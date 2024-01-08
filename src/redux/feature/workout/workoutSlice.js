"use client";
import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     workoutName: "",
//     category: "",
//     workoutTime: "",
//     workoutDescription: "",
//     workout_modules: []
// };
const initialState = {
  workout_cover: [],
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkoutCover: (state, action) => {
      state.workout_cover = action.payload;
    },
    removeWorkoutCover: (state, action) => {
      state.workout_cover = null;
    },
  },
});

export const { setWorkoutCover, removeWorkoutCover } = workoutSlice.actions;
export default workoutSlice.reducer;
