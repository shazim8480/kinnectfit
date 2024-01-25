import {
  CREATE_MEAL,
  CREATE_MEAL_PLAN,
  GET_ALL_MEALS,
  GET_ALL_MEAL_PLANS,
  GET_GROUPED_MEALS_BY_MEAL_PLAN_ID,
  GET_MEAL_BY_MEAL_PLAN,
  GET_SINGLE_MEAL_PLAN,
} from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const mealApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMealPlans: builder.query({
      query: () => `${GET_ALL_MEAL_PLANS}`,
      provideTags: ["mealPlans"],
    }),
    getFeaturedMealPlans: builder.query({
      query: () => `${GET_ALL_MEAL_PLANS}?sortBy=createdAt&sortOrder=desc&limit=4`,
      provideTags: ["mealPlans"],
    }),
    createMealPlan: builder.mutation({
      query: (data) => ({
        url: `${CREATE_MEAL_PLAN}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["mealPlans"],
    }),

    getAllMeals: builder.query({
      query: () => `${GET_ALL_MEALS}`,
      provideTags: ["meals"],
    }),
    createMeal: builder.mutation({
      query: (data) => ({
        url: `${CREATE_MEAL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["meals"],
    }),
    getSingleMealPlan: builder.query({
      query: (id) => `${GET_SINGLE_MEAL_PLAN}/${id}`,
      provideTags: ["mealPlans"],
    }),
    getMealByMealPlanID: builder.query({
      query: (id) => `${GET_MEAL_BY_MEAL_PLAN}/${id}`,
      provideTags: ["meals"],
    }),
    getGroupedMealsByMealPlanID: builder.query({
      query: (id) => `${GET_GROUPED_MEALS_BY_MEAL_PLAN_ID}/${id}`,
      provideTags: ["meals"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateMealPlanMutation,
  useGetAllMealPlansQuery,
  useGetSingleMealPlanQuery,
  useCreateMealMutation,
  useGetMealByMealPlanIDQuery,
  useGetGroupedMealsByMealPlanIDQuery,
  useGetFeaturedMealPlansQuery
} = mealApi;
