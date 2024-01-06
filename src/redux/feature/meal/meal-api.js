import {
  CREATE_MEAL,
  CREATE_MEAL_PLAN,
  GET_ALL_MEAL_PLANS,
  GET_SINGLE_MEAL_PLAN,
} from "@/constants/url";
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
    getAllMealPlans: builder.query({
      query: () => `${GET_ALL_MEAL_PLANS}`,
    }),
    getSingleMealPlan: builder.query({
      query: (id) => `${GET_SINGLE_MEAL_PLAN}/${id}`,
    }),
    createMeal: builder.mutation({
      query: (data) => ({
        url: `${CREATE_MEAL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  submitMealPlan: builder.mutation({
    query: ({ data, userId }) => ({
      url: `${SUBMIT_MEAL_PLAN}/${userId}`,
      method: "PUT",
      body: data,
    }),
  }),
});

export const {
  useCreateMealPlanMutation,
  useGetAllMealPlansQuery,
  useGetSingleMealPlanQuery,
  useCreateMealMutation,
  useSubmitMealPlanMutation,
} = mealApi;
