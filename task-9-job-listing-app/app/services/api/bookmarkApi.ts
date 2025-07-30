import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const bookmarkApi = createApi({
  reducerPath: "bookmarks",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession();
      const accessToken = (session?.user as any)?.data?.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBookmarks: builder.query<any, void>({
      query: () => ({
        url: "/bookmarks",
      }),
    }),
    addBookmark: builder.mutation<any, { eventID: string }>({
      query: ({ eventID }) => ({
        url: `/bookmarks/${eventID}`,
        method: "POST",
        body: {},
      }),
    }),
    removeBookmark: builder.mutation<any, { eventID: string }>({
      query: ({ eventID }) => ({
        url: `/bookmarks/${eventID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarkApi;
