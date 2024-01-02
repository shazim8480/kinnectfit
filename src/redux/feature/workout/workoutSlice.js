"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workoutName: "",
    category: "",
    workoutTime: "",
    workoutDescription: "",
    workoutModules: []
};

export const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        setWorkoutValues: (state, action) => {
            state, action, action.payload;
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setWorkoutValues } = workoutSlice.actions;
export default workoutSlice.reducer;
