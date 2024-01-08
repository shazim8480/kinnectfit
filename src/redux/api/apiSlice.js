import { PROTOCOL_HOST } from "@/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: PROTOCOL_HOST,
  }),
  tagTypes: [
    "trainers",
    "users",
    "workouts",
    "meals",
    "mealPlans",
    "moduleUpdate",
  ],
  endpoints: () => ({}),
  overrideExisting: true,
});
