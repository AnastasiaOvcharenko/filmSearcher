import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { setRating } from "./ratingsSlice";

export const rateThunk = createAsyncThunk(
  "rateMovie",
  async (payload: { movieId: string; rating: number }, { dispatch }) => {
    dispatch(setRating({ movieId: payload.movieId, rating: payload.rating }));
    const res = await dispatch(api.endpoints.rateMovie.initiate(payload));
    console.log(res);
  }
);
