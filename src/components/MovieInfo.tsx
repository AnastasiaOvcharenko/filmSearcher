import { useEffect, useState } from "react";
import UserRating from "./UserRating";
import styles from "./MovieInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/authSelectors";
import { rateThunk } from "../redux/ratingsThunks";
import { selectRatingByMovieId } from "../redux/ratingsSelector";
import useDebounce from "../hooks/useDebounce";

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

export default function MovieInfo({ movie }) {
  const [rating, setRating] = useState(0);
  const debouncedRating = useDebounce(rating);
  const dispatch = useDispatch();
  const isAuthorised = useSelector((state) => selectIsAuthenticated(state));
  const defaultRating = useSelector((state) =>
    selectRatingByMovieId(state, movie.id)
  );

  useEffect(
    function () {
      const changeRating = async function () {
        dispatch(rateThunk({ movieId: movie?.id, rating: debouncedRating }));
      };
      debouncedRating && changeRating();
    },
    [debouncedRating, dispatch, movie?.id]
  );

  return (
    <div className={styles.movieCard}>
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
          src={movie.poster}
          alt={`Обложка фильма ${movie.title}`}
        />
      </div>
      <div className={styles.movieCardInfo}>
        <span className={styles.movieTitle}>{movie.title}</span>

        <div>
          <span className={styles.movieCardInfoHeader}>Жанр:</span>
          <span className={styles.movieCardInfoText}>{movie.genre}</span>
        </div>
        <div>
          <span className={styles.movieCardInfoHeader}>Год выпуска:</span>
          <span className={styles.movieCardInfoText}>{movie.release_year}</span>
        </div>
        <div>
          <span className={styles.movieCardInfoHeader}>Рейтинг:</span>
          <span className={styles.movieCardInfoText}>{movie.rating}</span>
        </div>
        <div>
          <span className={styles.movieCardInfoHeader}>Описание</span>
        </div>
        <p className={styles.movieCardDesc}>{movie.description}</p>
      </div>
    </div>
  );
}
