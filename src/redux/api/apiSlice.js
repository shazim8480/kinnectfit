import { LOCAL_BACKEND, PROTOCOL_HOST } from "@/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: PROTOCOL_HOST,
    baseUrl: LOCAL_BACKEND,
  }),
  tagTypes: [],
  endpoints: () => ({}),
  overrideExisting: true,
});
