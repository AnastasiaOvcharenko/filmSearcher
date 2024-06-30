"use client";
import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import styles from "./Sidebar.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const GENRES = {
  "0": "Не выбран",
  comedy: "Комедия",
  drama: "Драма",
  action: "Боевик",
  thriller: "Триллер",
  horror: "Ужасы",
  family: "Семейный",
  cartoon: "Анимированный",
  fantasy: "Фэнтези",
  romance: "Романтика",
  adventure: "Приключения",
  musical: "Мьюзикл",
  war: "Военный",
};

const YEARS = {
  "0": "Не выбран",
  "2009": "2009",
  "2008": "2008",
  "2007": "2007",
  "2006": "2006",
  "1990-2005": "1990-2005",
  "1950-1989": "1950-1989",
};

export default function Sidebar() {
  const [genre, setGenre] = useState("0");
  const [year, setYear] = useState("0");
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (genre == "0") newSearchParams.delete("genre");

    if (year == "0") newSearchParams.delete("year");
    genre != "0" && newSearchParams.set("genre", genre);
    year != "0" && newSearchParams.set("year", year);

    router.push(pathname + "?" + newSearchParams);
  }, [year, genre, pathname, router, searchParams]);

  return (
    <div className={styles.filterBox}>
      <span className={styles.filterTitle}>Фильтр</span>
      <div className={styles.filterMain}>
        <div className={styles.filterRow}>
          <Dropdown label="Жанр" choiceSetter={setGenre}>
            <Dropdown.Header />
            <Dropdown.Menu>
              {Object.entries(GENRES).map(([value, text]) => (
                <Dropdown.Choice text={text} id={value} key={value} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.filterRow}>
          <Dropdown label="Год выпуска" choiceSetter={setYear}>
            <Dropdown.Header />
            <Dropdown.Menu>
              {Object.entries(YEARS).map(([value, text]) => (
                <Dropdown.Choice text={text} id={value} key={value} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
