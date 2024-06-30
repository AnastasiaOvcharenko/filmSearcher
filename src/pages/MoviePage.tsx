import Header from "../components/Header";
import MovieInfo from "../components/MovieInfo";
import Actors from "../components/Actors";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetMovieQuery } from "../redux/api";

export default function MoviePage() {
  const { movieId } = useParams();

  // const [movie, setMovie] = useState<Movie>({});
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(function () {
  //   const fetchMovie = async function () {
  //     setIsLoading(true);
  //     const data = await fetch(`http://localhost:3030/api/v1/movie/${movieId}`);
  //     const movieData = await data.json();
  //     try {
  //       setMovie(movieData);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchMovie();
  // }, []);

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
