"use client";
import styles from "./Loader.module.css";

export default function Loader() {
  // return <h1>Loading...</h1>;
  return (
    <div className={styles.loaderWrapper}>
      <svg
        width="49"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.loader}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.1322 8.35932C21.1322 10.7669 23.1085 12.7186 25.5463 12.7186C27.9841 12.7186 29.9603 10.7669 29.9603 8.35932C29.9603 5.95173 27.9841 4 25.5463 4C23.1085 4 21.1322 5.95173 21.1322 8.35932ZM17.1625 16.7784C15.1897 18.7267 11.9911 18.7267 10.0183 16.7784C8.04544 14.8301 8.04544 11.6712 10.0183 9.72292C11.9911 7.77461 15.1897 7.77461 17.1625 9.72292C19.1353 11.6712 19.1353 14.8301 17.1625 16.7784ZM14.2729 25.0597C14.2729 28.1341 11.7494 30.6263 8.63645 30.6263C5.52353 30.6263 3 28.1341 3 25.0597C3 21.9853 5.52353 19.4931 8.63645 19.4931C11.7494 19.4931 14.2729 21.9853 14.2729 25.0597ZM34.8289 15.8953C33.35 14.4347 33.35 12.0666 34.8289 10.606C36.3078 9.1454 38.7057 9.1454 40.1846 10.606C41.6636 12.0666 41.6636 14.4347 40.1846 15.8953C38.7057 17.3559 36.3078 17.3559 34.8289 15.8953ZM42.4561 21.5595C40.4988 21.5595 38.9122 23.1266 38.9122 25.0596C38.9122 26.9926 40.4988 28.5596 42.4561 28.5596C44.4133 28.5596 46 26.9926 46 25.0596C46 23.1266 44.4133 21.5595 42.4561 21.5595ZM35.4934 34.8851C36.6023 33.79 38.4003 33.79 39.5092 34.8851C40.6181 35.9802 40.6181 37.7558 39.5092 38.8509C38.4003 39.946 36.6023 39.946 35.4934 38.8509C34.3844 37.7558 34.3844 35.9802 35.4934 34.8851ZM27.8154 41.7594C27.8154 40.522 26.7997 39.5189 25.5467 39.5189C24.2938 39.5189 23.278 40.522 23.278 41.7594C23.278 42.9969 24.2938 44 25.5467 44C26.7997 44 27.8154 42.9969 27.8154 41.7594ZM14.9302 35.5445C15.6704 36.2755 15.6704 37.4607 14.9302 38.1916C14.1901 38.9226 12.9901 38.9226 12.2499 38.1916C11.5098 37.4607 11.5098 36.2755 12.2499 35.5445C12.9901 34.8136 14.1901 34.8136 14.9302 35.5445Z"
          fill="#999FA6"
        />
      </svg>
    </div>
  );
}
