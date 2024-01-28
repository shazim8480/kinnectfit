import { CREATE_REVIEW, GET_ALL_REVIEWS, GET_REVIEWS_BY_MEAL_PLAN, GET_REVIEWS_BY_WORKOUT } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const mealApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => `${GET_ALL_REVIEWS}`,
      providesTags: ["reviews"],
    }),
    getReviewsByWorkoutId: builder.query({
      query: (workout_id) => `${GET_REVIEWS_BY_WORKOUT}/${workout_id}`,
      providesTags: ["reviews"],
    }),
    getReviewsByMealPlanId: builder.query({
      query: (mealPlan_id) => `${GET_REVIEWS_BY_MEAL_PLAN}/${mealPlan_id}`,
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_REVIEW}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateReviewMutation, useGetReviewsByMealPlanIdQuery, useGetReviewsByWorkoutIdQuery } = mealApi;
