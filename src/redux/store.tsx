import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ratingsReducer from "./ratingsSlice";
import { thunk } from "redux-thunk";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    ratings: ratingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, api.middleware),
});
