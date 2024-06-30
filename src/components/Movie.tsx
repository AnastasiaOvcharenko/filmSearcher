"use client";
import { useEffect, useState } from "react";
import styles from "./Movie.module.css";
import UserRating from "./UserRating";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/authSelectors";
import { rateThunk } from "../redux/ratingsThunks";
import { selectRatingByMovieId } from "../redux/ratingsSelector";
import useDebounce from "../hooks/useDebounce";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Movie {
  id: string;
  title: string;
  description: string;
  release_year: number;
  poster: string; //base64 img
  genre: string;
  rating: string; //float
  total_rates_count: string; //int
}

export interface MovieProps {
  movie: Movie;
}

export default function Movie({ movie }: MovieProps) {
  const [rating, setRating] = useState(0);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorised = useSelector((state) => selectIsAuthenticated(state));
  const defaultRating = useSelector((state) =>
    selectRatingByMovieId(state, movie.id)
  );
  const debouncedRating = useDebounce(rating);

  useEffect(
    function () {
      const changeRating = async function () {
        dispatch(rateThunk({ movieId: movie?.id, rating: debouncedRating }));
      };
      debouncedRating && changeRating();
    },
    [debouncedRating, dispatch, movie?.id]
  );

  const router = useRouter();
  // const pathname = usePathname();

  return (
    // <Link
    //   href={
    //     // <pathname>?sort=desc
    //     "/movie/" + movie.id
    //   }
    // >
    <div
      className={styles.movieCard}
      onClick={() => router.push("/movie/" + movie.id)}
      // onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {isAuthorised ? (
        <UserRating
          setOutsideRating={setRating}
          defaultRating={defaultRating}
        />
      ) : (
        ""
      )}
      <div>
        <img
          className={styles.moviePoster}
          src={movie?.poster}
          alt={`Обложка фильма ${movie?.title}`}
        />
      </div>
      <div className={styles.movieCardInfo}>
        <span className={styles.movieTitle}>{movie.title}</span>
        <div className={styles.movieCardInfoBlock}>
          <div className={styles.movieCardInfoHeader}>
            <span>Жанр</span>
            <span>Год выпуска</span>
            <span>Описание</span>
          </div>
          <div className={styles.movieCardInfoBody}>
            <span>{movie.genre}</span>
            <span>{movie.release_year}</span>
            <span>{movie.description}</span>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}
