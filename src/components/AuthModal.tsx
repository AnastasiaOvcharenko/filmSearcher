import ReactDOM from "react-dom";
import styles from "./AuthModal.module.css";
import Button from "./Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/authThunks";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // children: ReactNode;
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  if (!isOpen) return null;
  const handleAuth = async function () {
    setUsernameError(false);
    setPasswordError(false);

    if (username === "") {
      setUsernameError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (username === "" || password === "") {
      return;
    }
    try {
      await dispatch(loginThunk({ username, password }));
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* <button> */}
        <div className={styles.authHeader}>
          <span className={styles.authHeaderText}>Авторизация</span>
          <svg
            onClick={onClose}
            className={styles.modalClose}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.7074 24.2925C25.8004 24.3854 25.8741 24.4957 25.9243 24.6171C25.9746 24.7385 26.0005 24.8686 26.0005 25C26.0005 25.1314 25.9746 25.2615 25.9243 25.3829C25.8741 25.5043 25.8004 25.6146 25.7074 25.7075C25.6145 25.8004 25.5042 25.8741 25.3828 25.9244C25.2614 25.9747 25.1313 26.0006 24.9999 26.0006C24.8686 26.0006 24.7384 25.9747 24.6171 25.9244C24.4957 25.8741 24.3854 25.8004 24.2924 25.7075L15.9999 17.4138L7.70745 25.7075C7.5198 25.8951 7.26531 26.0006 6.99995 26.0006C6.73458 26.0006 6.48009 25.8951 6.29245 25.7075C6.1048 25.5199 5.99939 25.2654 5.99939 25C5.99939 24.7346 6.10481 24.4801 6.29245 24.2925L14.5862 16L6.29245 7.70751C6.1048 7.51987 5.99939 7.26537 5.99939 7.00001C5.99939 6.73464 6.1048 6.48015 6.29245 6.29251C6.48009 6.10487 6.73458 5.99945 6.99995 5.99945C7.26531 5.99945 7.5198 6.10487 7.70745 6.29251L15.9999 14.5863L24.2924 6.29251C24.4801 6.10487 24.7346 5.99945 24.9999 5.99945C25.2653 5.99945 25.5198 6.10487 25.7074 6.29251C25.8951 6.48015 26.0005 6.73464 26.0005 7.00001C26.0005 7.26537 25.8951 7.51987 25.7074 7.70751L17.4137 16L25.7074 24.2925Z"
              fill="#333333"
            />
          </svg>
        </div>
        {/* </button> */}
        <div className={styles.authBlock}>
          <span className={styles.authBlockName}>
            Логин <span style={{ color: "red" }}>*</span>
          </span>

          <input
            className={`${styles.authInput} ${
              usernameError ? styles.error : ""
            }`}
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className={styles.authBlock}>
          <span className={styles.authBlockName}>
            Пароль <span style={{ color: "red" }}>*</span>
          </span>
          <input
            className={`${styles.authInput} ${
              passwordError ? styles.error : ""
            }`}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className={styles.authButtons}>
          <Button text="Войти" onClick={handleAuth} />
          <Button text="Отменить" onClick={onClose} buttonType="empty" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
