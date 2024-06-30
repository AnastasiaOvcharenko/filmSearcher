import { useEffect, useState } from "react";
import Movie from "./Movie";
import styles from "./Main.module.css";
import useDebounce from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useGetMoviesQuery } from "../redux/api";

export default function Main() {
  type Actor = {
    name: string;
    photo: string; // base64 img
  };

  interface Movie {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string; //base64 img
    genre: string;
    rating: string; //float
    total_rates_count: string; //int
    actors: Actor[];
  }

  const [searchParams, setSearchParams] = useSearchParams();
  // const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );
  const debouncedSearch = useDebounce(searchQuery);

  const filters = [];
  searchParams.get("query") &&
    filters.push(`title=${searchParams.get("query")}`);
  searchParams.get("year") &&
    filters.push(`release_year=${searchParams.get("year")}`);
  searchParams.get("genre") &&
    filters.push(`genre=${searchParams.get("genre")}`);
  searchParams.get("currentPage") &&
    filters.push(`page=${searchParams.get("currentPage")}`);

  const {
    data: moviesResult,
    isLoading: isLoading,
    error: error,
  } = useGetMoviesQuery(filters);

  const movies = moviesResult?.search_result;

  useEffect(
    function () {
      if (debouncedSearch === "") searchParams.delete("query");
      const newSearchParams = new URLSearchParams(searchParams);
      debouncedSearch && newSearchParams.set("query", debouncedSearch);
      currentPage && newSearchParams.set("currentPage", `${currentPage}`);
      setSearchParams(newSearchParams);
    },
    [debouncedSearch, setSearchParams, searchParams, currentPage]
  );

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <div className={styles.inputIcon}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.833252 7.66671C0.833252 11.4334 3.89992 14.5 7.66659 14.5C11.4333 14.5 14.4999 11.4334 14.4999 7.66671C14.4999 3.90004 11.4333 0.833374 7.66659 0.833374C3.89992 0.833374 0.833252 3.90004 0.833252 7.66671ZM1.83325 7.66671C1.83325 4.45337 4.44659 1.83337 7.66659 1.83337C10.8866 1.83337 13.4999 4.45337 13.4999 7.66671C13.4999 10.88 10.8866 13.5 7.66659 13.5C4.44659 13.5 1.83325 10.88 1.83325 7.66671ZM14.3132 15.02C14.4132 15.12 14.5399 15.1666 14.6666 15.1666C14.7932 15.1666 14.9199 15.12 15.0199 15.02C15.2132 14.8266 15.2132 14.5066 15.0199 14.3133L13.6866 12.98C13.4932 12.7866 13.1732 12.7866 12.9799 12.98C12.7866 13.1733 12.7866 13.4933 12.9799 13.6866L14.3132 15.02Z"
            fill="#999FA6"
          />
        </svg>

        <input
          placeholder="Название фильма"
          className={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.inputClear}
            onClick={() => setSearchQuery("")}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00004 15.1667C4.04671 15.1667 0.833374 11.9534 0.833374 8.00004C0.833374 4.04671 4.04671 0.833374 8.00004 0.833374C11.9534 0.833374 15.1667 4.04671 15.1667 8.00004C15.1667 11.9534 11.9534 15.1667 8.00004 15.1667ZM8.00004 1.83337C4.60004 1.83337 1.83337 4.60004 1.83337 8.00004C1.83337 11.4 4.60004 14.1667 8.00004 14.1667C11.4 14.1667 14.1667 11.4 14.1667 8.00004C14.1667 4.60004 11.4 1.83337 8.00004 1.83337ZM6.11337 10.3867C5.9867 10.3867 5.86004 10.34 5.76004 10.24C5.5667 10.0467 5.5667 9.72666 5.76004 9.53332L7.29337 7.99999L5.76004 6.46666C5.5667 6.27332 5.5667 5.95332 5.76004 5.75999C5.95337 5.56666 6.27337 5.56666 6.4667 5.75999L8.00004 7.29332L9.53337 5.75999C9.7267 5.56666 10.0467 5.56666 10.24 5.75999C10.4334 5.95332 10.4334 6.27332 10.24 6.46666L8.7067 7.99999L10.24 9.53332C10.4334 9.72666 10.4334 10.0467 10.24 10.24C10.14 10.34 10.0134 10.3867 9.8867 10.3867C9.76004 10.3867 9.63337 10.34 9.53337 10.24L8.00004 8.70666L6.4667 10.24C6.37337 10.34 6.24004 10.3867 6.11337 10.3867Z"
              fill="#999FA6"
            />
          </svg>
        ) : (
          ""
        )}
      </div>
      <div className={styles.moviesContainer}>
        {!isLoading ? (
          movies?.map((movie) => <Movie movie={movie} key={movie.title} />)
        ) : (
          <Loader />
        )}
      </div>
      {totalPages && !isLoading ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        ""
      )}
    </div>
  );
}
