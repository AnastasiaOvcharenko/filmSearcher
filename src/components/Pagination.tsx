import React from "react";
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
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${styles["page-item"]} ${
            i === currentPage ? styles.active : ""
          }`}
          onClick={() => handleClick(i)}
        >
          <span className={styles["page-link"]}>{i}</span>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.pagination}>
        <li
          className={styles["page-item"]}
          onClick={() => handleClick(currentPage - 1)}
        >
          <span className={styles["page-link"]}>Назад</span>
        </li>
        {renderPageNumbers()}
        <li
          className={styles["page-item"]}
          onClick={() => handleClick(currentPage + 1)}
        >
          <span className={styles["page-link"]}>Вперед</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
