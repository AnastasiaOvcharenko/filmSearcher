// import React from "react";
// import styles from "./Pagination.module.css";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const handleClick = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li
//           key={i}
//           className={`${styles["page-item"]} ${
//             i === currentPage ? styles.active : ""
//           }`}
//           onClick={() => handleClick(i)}
//         >
//           <span className={styles["page-link"]}>{i}</span>
//         </li>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className={styles.wrapper}>
//       <ul className={styles.pagination}>
//         <li
//           className={styles["page-item"]}
//           onClick={() => handleClick(currentPage - 1)}
//         >
//           <span className={styles["page-link"]}>Назад</span>
//         </li>
//         {renderPageNumbers()}
//         <li
//           className={styles["page-item"]}
//           onClick={() => handleClick(currentPage + 1)}
//         >
//           <span className={styles["page-link"]}>Вперед</span>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Pagination;

import React, { useState } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      onPageChange(newPage);
    }
  };

  console.log("test");

  return (
    <div className={styles.pagination}>
      <svg
        className={styles.icon}
        onClick={handlePreviousPage}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 20.67C14.81 20.67 14.62 20.6 14.47 20.45L7.95003 13.93C6.89003 12.87 6.89003 11.13 7.95003 10.07L14.47 3.55002C14.76 3.26002 15.24 3.26002 15.53 3.55002C15.82 3.84002 15.82 4.32002 15.53 4.61002L9.01003 11.13C8.53003 11.61 8.53003 12.39 9.01003 12.87L15.53 19.39C15.82 19.68 15.82 20.16 15.53 20.45C15.38 20.59 15.19 20.67 15 20.67Z"
          fill="#333333"
        />
      </svg>
      <span className={styles.pageNumber}>{currentPage}</span>
      <svg
        className={styles.icon}
        onClick={handleNextPage}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.90998 20.67C8.71998 20.67 8.52998 20.6 8.37998 20.45C8.08998 20.16 8.08998 19.68 8.37998 19.39L14.9 12.87C15.38 12.39 15.38 11.61 14.9 11.13L8.37998 4.61002C8.08998 4.32002 8.08998 3.84002 8.37998 3.55002C8.66998 3.26002 9.14998 3.26002 9.43998 3.55002L15.96 10.07C16.47 10.58 16.76 11.27 16.76 12C16.76 12.73 16.48 13.42 15.96 13.93L9.43998 20.45C9.28998 20.59 9.09998 20.67 8.90998 20.67Z"
          fill="#333333"
        />
      </svg>
    </div>
  );
};

export default Pagination;
