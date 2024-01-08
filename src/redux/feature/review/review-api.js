import { CREATE_REVIEW, GET_ALL_REVIEWS } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const mealApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => `${GET_ALL_REVIEWS}`,
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${CREATE_REVIEW}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateReviewMutation } = mealApi;
