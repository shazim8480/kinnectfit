import { CREATE_MEAL_PLAN } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const mealApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMealPlan: builder.mutation({
      query: (data) => ({
        url: `${CREATE_MEAL_PLAN}`,
        method: "POST",
        body: data,
      }),
    }),
    submitMealPlan: builder.mutation({
      query: ({ data, userId }) => ({
        url: `${SUBMIT_MEAL_PLAN}/${userId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useCreateMealPlanMutation, useSubmitMealPlanMutation } = mealApi;
