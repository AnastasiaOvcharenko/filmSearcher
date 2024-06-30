// import React from 'react'
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import styles from "./Home.module.css";
// import { Dropdown } from "../components/Dropdown";
// import { useState } from "react";

export default function Home() {
  // const [genre, setGenre] = useState("");
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <Main />
      </main>
      {/* <Dropdown label="Жанр" choiceSetter={setGenre}>
        <Dropdown.Header />
        <Dropdown.Menu>
          <Dropdown.Choice text="Не выбран" />
          <Dropdown.Choice text="action" />
          <Dropdown.Choice text="comedy" />
          <Dropdown.Choice text="fantasy" />
          <Dropdown.Choice text="horror" />
        </Dropdown.Menu>
      </Dropdown> */}
    </>
  );
}
