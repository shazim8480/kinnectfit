import { GET_ALL_USER, GET_A_USER, UPDATE_USER } from "@/constants/url";
import { api } from "@/redux/api/apiSlice";

const updateUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: ({ data, userId }) => ({
                url: `${UPDATE_USER}/${userId}`,
                method: "PUT",
                body: data,
            }),
        }),
        getAllUsers: builder.query({
            query: () => `${GET_ALL_USER}`,
        }),
        getSingleUser: builder.query({
            query: (id) => `${GET_A_USER}/${id}`,
        }),
    }),
});

export const { useUpdateUserMutation, useGetAllUsersQuery, useGetSingleUserQuery } = updateUserApi;
