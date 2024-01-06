import { CREATE_WORKOUT, GET_ALL_WORKOUTS, GET_SINGLE_MEAL_PLAN, GET_SINGLE_WORKOUT, START_WORKOUT } from "@/constants/url";
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
        getAllWorkouts: builder.query({
            query: () => `${GET_ALL_WORKOUTS}`,
        }),
        getSingleWorkout: builder.query({
            query: (id) => `${GET_SINGLE_WORKOUT}/${id}`,
        }),
    }),
});

export const { useCreateWorkoutMutation, useStartWorkoutMutation, useGetAllWorkoutsQuery, useGetSingleWorkoutQuery } = workoutApi;
