import { USER_LOGIN, USER_SIGN_UP } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data, accessToken) => ({
        url: `${USER_LOGIN}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${USER_SIGN_UP}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSignInMutation, useSignUpMutation } = authApi;
