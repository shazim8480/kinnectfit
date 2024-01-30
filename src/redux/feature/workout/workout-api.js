import {
  CREATE_WORKOUT,
  CREATE_WORKOUT_MODULE,
  ENROLL_WORKOUT_MODULE,
  GET_ALL_WORKOUTS,
  GET_ENROLL_WORKOUT_MODULES_BY_USER,
  GET_SINGLE_WORKOUT, GET_WORKOUT_MODULE_BY_WORKOUT,
  START_WORKOUT,
  UPDATE_WORKOUT_MODULE
} from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const workoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkouts: builder.query({
      query: ({ searchTerm, limit, page, categories }) => {
        let category;
        if (categories && categories.length > 0) {
          category = `workout_category=${categories}`;
        }
        return `${GET_ALL_WORKOUTS}?searchTerm=${searchTerm}&limit=${limit || 12}&page=${page}&${category}`;
      },
      providesTags: ["workouts"],
    }),
    getFeaturedWorkouts: builder.query({
      query: () => `${GET_ALL_WORKOUTS}?sortBy=createdAt&sortOrder=desc&limit=8`,
      provideTags: ["workouts"],
    }),
    createWorkout: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_WORKOUT}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["workouts"],
    }),
    getWorkoutModuleByWorkoutId: builder.query({
      query: (id) => `${GET_WORKOUT_MODULE_BY_WORKOUT}/${id}`,
      providesTags: ["moduleUpdate"],
    }),

    startWorkout: builder.mutation({
      query: ({ data, userId }) => ({
        url: `${START_WORKOUT}/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["moduleUpdate"],
    }),

    getSingleWorkout: builder.query({
      query: (id) => `${GET_SINGLE_WORKOUT}/${id}`,
    }),
    updateWorkoutModule: builder.mutation({
      query: ({ data, id, module_id }) => ({
        url: `${UPDATE_WORKOUT_MODULE}/${id}/${module_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["moduleUpdate"],
    }),
    createWorkoutModule: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_WORKOUT_MODULE}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["moduleUpdate"],
    }),
    enrollWorkoutModule: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${ENROLL_WORKOUT_MODULE}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["moduleUpdate"],
    }),
    getEnrolledWorkoutModuleByUserId: builder.query({
      query: (id) => `${GET_ENROLL_WORKOUT_MODULES_BY_USER}/${id}`,
      providesTags: ["moduleUpdate"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateWorkoutMutation,
  useStartWorkoutMutation,
  useGetAllWorkoutsQuery,
  useGetFeaturedWorkoutsQuery,
  useGetSingleWorkoutQuery,
  useUpdateWorkoutModuleMutation,
  useGetUserWorkoutByIdQuery,
  useGetWorkoutModuleByWorkoutIdQuery,
  useEnrollWorkoutModuleMutation,
  useGetEnrolledWorkoutModuleByUserIdQuery,
  useCreateWorkoutModuleMutation
} = workoutApi;
