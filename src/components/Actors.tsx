import React, { useEffect, useRef, useState } from "react";
import styles from "./Actors.module.css";

interface Actor {
  id: number;
  name: string;
  photo: string;
}

interface ActorScrollerProps {
  actors: Actor[];
}

const Actors: React.FC<ActorScrollerProps> = ({ movie }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const actors = movie.actors;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    handleScroll(); // Initial check
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -160, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 160, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1 className={styles.primary}>Актёры</h1>
      <div className={styles.wrapper}>
        {canScrollLeft && (
          <button className={styles.scrollButtonLeft} onClick={scrollLeft}>
            <svg
              className={styles.scrollIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 20.67C14.81 20.67 14.62 20.6 14.47 20.45L7.95003 13.93C6.89003 12.87 6.89003 11.13 7.95003 10.07L14.47 3.55002C14.76 3.26002 15.24 3.26002 15.53 3.55002C15.82 3.84002 15.82 4.32002 15.53 4.61002L9.01003 11.13C8.53003 11.61 8.53003 12.39 9.01003 12.87L15.53 19.39C15.82 19.68 15.82 20.16 15.53 20.45C15.38 20.59 15.19 20.67 15 20.67Z" />
            </svg>
          </button>
        )}
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {actors?.map((actor) => (
            <div key={actor.id} className={styles.actorCard}>
              <img
                src={actor.photo}
                alt={actor.name}
                className={styles.actorPhoto}
              />
              <div className={styles.actorName}>{actor.name}</div>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button className={styles.scrollButtonRight} onClick={scrollRight}>
            <svg
              className={styles.scrollIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.90998 20.67C8.71998 20.67 8.52998 20.6 8.37998 20.45C8.08998 20.16 8.08998 19.68 8.37998 19.39L14.9 12.87C15.38 12.39 15.38 11.61 14.9 11.13L8.37998 4.61002C8.08998 4.32002 8.08998 3.84002 8.37998 3.55002C8.66998 3.26002 9.14998 3.26002 9.43998 3.55002L15.96 10.07C16.47 10.58 16.76 11.27 16.76 12C16.76 12.73 16.48 13.42 15.96 13.93L9.43998 20.45C9.28998 20.59 9.09998 20.67 8.90998 20.67Z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Actors;
