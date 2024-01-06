import { CREATE_WORKOUT, GET_ALL_WORKOUTS, GET_SINGLE_MEAL_PLAN, GET_SINGLE_WORKOUT, GET_USER_WORKOUT_BY_ID, START_WORKOUT, UPDATE_USER_WORKOUT_MODULE_BY_STATUS } from "@/constants/url";
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
        getUserWorkoutById: builder.query({
            query: (id) => `${GET_USER_WORKOUT_BY_ID}/${id}`,
        }),
        updateWorkoutModuleStatus: builder.mutation({
            query: ({ data, userId }) => ({
                url: `${UPDATE_USER_WORKOUT_MODULE_BY_STATUS}/${userId}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useCreateWorkoutMutation, useStartWorkoutMutation, useGetAllWorkoutsQuery, useGetSingleWorkoutQuery, useGetUserWorkoutByIdQuery, useUpdateWorkoutModuleStatusMutation } = workoutApi;
