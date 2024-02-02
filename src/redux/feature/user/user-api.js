import { GET_ALL_USER, GET_A_USER, GET_TRAINER_BY_USER } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const updateUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${GET_ALL_USER}`,
      providesTags: ["users"],
    }),
    // updateUser: builder.mutation({
    //   query: ({ data, userId }) => ({
    //     url: `${UPDATE_USER}/${userId}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["users"],
    // }),
    getSingleUser: builder.query({
      query: (id) => `${GET_A_USER}/${id}`,
    }),
    getTrainerByUser: builder.query({
      query: (id) => `${GET_TRAINER_BY_USER}/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  // useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetTrainerByUserQuery
} = updateUserApi;
