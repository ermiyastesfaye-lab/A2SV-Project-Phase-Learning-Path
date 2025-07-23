import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "../services/api/jobApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

setupListeners(store.dispatch);
