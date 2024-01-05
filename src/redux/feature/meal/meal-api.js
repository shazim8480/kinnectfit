import { CREATE_MEAL_PLAN, GET_ALL_MEAL_PLANS, GET_SINGLE_MEAL_PLAN } from "@/constants/url";
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

    }),
});

export const { useCreateMealPlanMutation, useGetAllMealPlansQuery,useGetSingleMealPlanQuery } = mealApi;
