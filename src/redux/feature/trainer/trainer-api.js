import { CREATE_TRAINER, CREATE_TRAINER_REQUEST, CREATE_TRAINER_URL, GET_ALL_TRAINERS, GET_ALL_TRAINERS_URL, GET_A_SINGLE_TRAINER, PAUSE_TRAINER } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const trainerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainers: builder.query({
      query: (accessToken) => ({
        url: `${GET_ALL_TRAINERS}`,
        method: 'GET',
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
      providesTags: ["trainers"],
    }),
    trainerRequest: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_TRAINER_REQUEST}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
      invalidatesTags: ["trainers"],
    }),
    createTrainer: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_TRAINER}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
      invalidatesTags: ["trainers"],
    }),
    pauseTrainer: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${PAUSE_TRAINER}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
      invalidatesTags: ["trainers"],
    }),
    getSingleTrainer: builder.query({
      query: (id) => `${GET_A_SINGLE_TRAINER}/${id}`,
      provideTags: ["trainers"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateTrainerMutation, useGetAllTrainersQuery, useTrainerRequestMutation, useGetSingleTrainerQuery, usePauseTrainerMutation } = trainerApi;


