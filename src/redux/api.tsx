import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/api/v1/" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (filters) =>
        filters.length > 0 ? "search?".concat(filters.join("&")) : "search",
    }),
    getMovie: builder.query({
      query: (movieId) => `movie/${movieId}`,
      providesTags: (result) => [
        { type: "Movie", id: result.id }, // Тег для provides
      ],
    }),
    getAuth: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    rateMovie: builder.mutation({
      query: (payload: { movieId: string; rating: number }) => ({
        url: "rateMovie",
        method: "POST",
        body: JSON.stringify({
          movieId: payload.movieId,
          user_rate: payload.rating,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // onSuccess: (data, variables, { queryClient }) => {
      //   queryClient.getMovie(["movie", variables.movieId], (oldData) => ({
      //     ...oldData,
      //     rating: variables.rating, // Update the rating in the existing data
      //   }));
      // },
      invalidatesTags: (result, error, { movieId }) => [
        { type: "Movie", id: movieId }, // Тег для invalidate
      ],
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieQuery, getAuth } = api;
