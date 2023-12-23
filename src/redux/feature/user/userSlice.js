"use client";
import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user data in the store
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // Action to clear user data from the store (on logout or error)
    logOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    // Action to set loading state
    setLoading: (state) => {
      state.loading = true;
    },
    // Action to set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { setUser, logOutUser, setLoading, setError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
