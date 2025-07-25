import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      any,
      {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role: string;
      }
    >({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    verify: builder.mutation<
      any,
      {
        email: string;
        OTP: string;
      }
    >({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    getAllJobs: builder.query<any, void>({
      query: () => "/opportunities/search",
    }),
    getJobById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useVerifyMutation,
} = jobApi;
