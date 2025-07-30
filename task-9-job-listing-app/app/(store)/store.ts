import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "../services/api/jobApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarkApi } from "../services/api/bookmarkApi";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware, bookmarkApi.middleware),
});

setupListeners(store.dispatch);
