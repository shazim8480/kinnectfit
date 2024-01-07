import { CREATE_TRAINER_URL, GET_ALL_TRAINERS_URL } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const trainerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainers: builder.query({
      query: () => `${GET_ALL_TRAINERS_URL}`,
      providesTags: ["trainers"],
    }),
    addTrainer: builder.mutation({
      query: (data) => ({
        url: `${CREATE_TRAINER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["trainers"],
    }),
  }),
  overrideExisting: true,
});

export const { useAddTrainerMutation, useGetAllTrainersQuery } = trainerApi;
