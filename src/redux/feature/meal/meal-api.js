import {
  CREATE_MEAL,
  CREATE_MEAL_PLAN,
  GET_ALL_MEALS,
  GET_ALL_MEALS_BY_MEAL_PLAN,
  GET_ALL_MEAL_PLANS, GET_MEALS_BY_TRAINER, GET_MEAL_BY_MEAL_PLAN,
  GET_MEAL_PLAN_BY_TRAINER,
  GET_SELECTED_MEALS_BY_USER_ID,
  GET_SINGLE_MEAL_PLAN,
  SELECT_MEAL
} from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const mealApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMealPlans: builder.query({
      query: ({ searchTerm, limit, page, categories }) => {
        let category;
        if (categories && categories.length > 0) {
          category = `mealPlan_category=${categories}`;
        }
        return `${GET_ALL_MEAL_PLANS}?searchTerm=${searchTerm}&limit=${limit || 12}&page=${page}&${category}`;
      },
      provideTags: ["mealPlans"],
    }),
    getFeaturedMealPlans: builder.query({
      query: () => `${GET_ALL_MEAL_PLANS}?sortBy=createdAt&sortOrder=desc&limit=4`,
      provideTags: ["mealPlans"],
    }),
    createMealPlan: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_MEAL_PLAN}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["mealPlans"],
    }),

    getAllMeals: builder.query({
      query: () => `${GET_ALL_MEALS}`,
      provideTags: ["meals"],
    }),
    createMeal: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_MEAL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
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
      query: (id) => `${GET_ALL_MEALS_BY_MEAL_PLAN}/${id}`,
      provideTags: ["meals"],
    }),
    selectMeal: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${SELECT_MEAL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["meals"],
    }),
    getMealByUserID: builder.query({
      query: (id) => `${GET_SELECTED_MEALS_BY_USER_ID}/${id}`,
      provideTags: ["meals"],
    }),
    getMealByTrainerID: builder.query({
      query: (id) => `${GET_MEALS_BY_TRAINER}/${id}`,
      provideTags: ["meals"],
    }),
    getMealPlanByTrainerID: builder.query({
      query: (id) => `${GET_MEAL_PLAN_BY_TRAINER}/${id}`,
      provideTags: ["mealPlans"],
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
  useGetFeaturedMealPlansQuery,
  useSelectMealMutation,
  useGetMealByUserIDQuery,
  useGetMealByTrainerIDQuery,
  useGetMealPlanByTrainerIDQuery
} = mealApi;
