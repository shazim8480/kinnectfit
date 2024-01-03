import { CREATE_WORKOUT } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const workoutApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createWorkout: builder.mutation({
            query: (data) => ({
                url: `${CREATE_WORKOUT}`,
                method: "POST",
                body: data,
            }),
        }),

    }),
});

export const { useCreateWorkoutMutation } = workoutApi;
