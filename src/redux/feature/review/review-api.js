
import { CREATE_REVIEW } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const mealApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => ({
                url: `${CREATE_REVIEW}`,
                method: "POST",
                body: data,
            }),
        })

    }),
});

export const { useCreateReviewMutation } = mealApi;
