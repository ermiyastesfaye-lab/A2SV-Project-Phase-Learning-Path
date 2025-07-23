import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => "/opportunities/search",
    }),
    getJobById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),
  }),
});

export const { useGetAllJobsQuery, useGetJobByIdQuery } = jobApi;
