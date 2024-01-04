import { CREATE_WORKOUT, START_WORKOUT } from "@/constants/url";
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
        startWorkout: builder.mutation({
            query: ({ data, userId }) => ({
                url: `${START_WORKOUT}/${userId}`,
                method: "PUT",
                body: data,
            }),
        }),

    }),
});

export const { useCreateWorkoutMutation, useStartWorkoutMutation } = workoutApi;
