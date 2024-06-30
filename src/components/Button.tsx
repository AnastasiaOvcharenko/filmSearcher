"use client";
import { Dispatch } from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  buttonType?: string;
  text: string;
  onClick: () => void;
}

export default function Button({ buttonType, text, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${
        buttonType === "empty" ? styles.empty : styles.filled
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
