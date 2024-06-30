"use client";
import Header from "../../../components/Header";
import MovieInfo from "../../../components/MovieInfo";
import Actors from "../../../components/Actors";
import { useGetMovieQuery } from "../../../redux/api";
import Loader from "../../../components/Loader";

export default function MoviePage({ params }) {
  const movieId = params.movieId;

  const {
    data: movie,
    isLoading: isLoading,
    error: error,
  } = useGetMovieQuery(movieId);

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Header />
      {!isLoading ? <MovieInfo movie={movie} /> : <Loader />}
      {!isLoading ? <Actors movie={movie} /> : ""}
    </>
  );
}
