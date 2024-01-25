import { CREATE_TRAINER_URL, GET_ALL_TRAINERS_URL } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const trainerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainers: builder.query({
      query: () => `${GET_ALL_TRAINERS_URL}`,
      providesTags: ["trainers"],
    }),
    addTrainer: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${CREATE_TRAINER_URL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
      invalidatesTags: ["trainers"],
    }),
  }),
  overrideExisting: true,
});

export const { useAddTrainerMutation, useGetAllTrainersQuery } = trainerApi;
