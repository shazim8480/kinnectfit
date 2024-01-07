import {
  CREATE_WORKOUT,
  GET_ALL_WORKOUTS,
  GET_SINGLE_MEAL_PLAN,
  GET_SINGLE_WORKOUT,
  GET_USER_WORKOUT_BY_ID,
  START_WORKOUT,
  UPDATE_WORKOUT_MODULE,
} from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const workoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createWorkout: builder.mutation({
      query: (data) => ({
        url: `${CREATE_WORKOUT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wokouts"],
    }),
    startWorkout: builder.mutation({
      query: ({ data, userId }) => ({
        url: `${START_WORKOUT}/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["wokouts"],
    }),
    getAllWorkouts: builder.query({
      query: () => `${GET_ALL_WORKOUTS}`,
      providesTags: ["wokouts"],
    }),
    getSingleWorkout: builder.query({
      query: (id) => `${GET_SINGLE_WORKOUT}/${id}`,
      providesTags: ["wokouts"],
    }),
    getUserWorkoutById: builder.query({
      query: (id) => `${GET_USER_WORKOUT_BY_ID}/${id}`,
      providesTags: ["wokouts"],
    }),
    updateWorkoutModule: builder.mutation({
      query: ({ data, id, module_id }) => ({
        url: `${UPDATE_WORKOUT_MODULE}/${id}/${module_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["wokouts"],
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useStartWorkoutMutation,
  useGetAllWorkoutsQuery,
  useGetSingleWorkoutQuery,
  useUpdateWorkoutModuleMutation,
  useGetUserWorkoutByIdQuery,
} = workoutApi;
