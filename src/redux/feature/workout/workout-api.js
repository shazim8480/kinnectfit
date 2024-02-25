import {
  CREATE_WORKOUT,
  CREATE_WORKOUT_MODULE,
  ENROLL_WORKOUT_MODULE,
  GET_ALL_WORKOUTS,
  GET_ALL_WORKOUT_MODULES,
  GET_ENROLL_WORKOUT_MODULES_BY_USER,
  GET_SINGLE_WORKOUT, GET_WORKOUT_MODULES_BY_TRAINER, GET_WORKOUT_MODULE_BY_WORKOUT
} from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const workoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkouts: builder.query({
      query: ({ searchTerm, limit, page, categories }) => {
        let category;
        let URL;
        if (categories && categories.length > 0) {
          category = `workout_category=${categories}`;
        }
        URL = `${GET_ALL_WORKOUTS}?searchTerm=${searchTerm}&limit=${limit || 12}&page=${page || 1}&${category}`;
        console.log("👨‍🦱URL", URL);

        return URL;
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


    getSingleWorkout: builder.query({
      query: (id) => `${GET_SINGLE_WORKOUT}/${id}`,
    }),
    getAllWorkoutModules: builder.query({
      query: () => `${GET_ALL_WORKOUT_MODULES}`,
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
    getWorkoutModuleByTrainerId: builder.query({
      query: (id) => `${GET_WORKOUT_MODULES_BY_TRAINER}/${id}`,
      providesTags: ["moduleUpdate"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateWorkoutMutation,
  useGetAllWorkoutsQuery,
  useGetFeaturedWorkoutsQuery,
  useGetSingleWorkoutQuery,
  useGetUserWorkoutByIdQuery,
  useGetWorkoutModuleByWorkoutIdQuery,
  useEnrollWorkoutModuleMutation,
  useGetEnrolledWorkoutModuleByUserIdQuery,
  useCreateWorkoutModuleMutation,
  useGetAllWorkoutModulesQuery,
  useGetWorkoutModuleByTrainerIdQuery
} = workoutApi;
