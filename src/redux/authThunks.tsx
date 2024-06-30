// src/store/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "./authSlice";
import { api } from "./api";
import { clearRatings, setRating } from "./ratingsSlice";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, { dispatch }) => {
    // try {
    // const response = await fetch("http://localhost:3030/api/v1/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: credentials.username,
    //     password: credentials.password,
    //   }),
    // });
    // const data = await response.json();
    // const token = data.token;

    // const {
    //   data: tokenResult,
    // isLoading: isLoading,
    // error: error,
    // } = getAuth(credentials);

    const res = await dispatch(api.endpoints.getAuth.initiate(credentials));
    const token = res.data.token;

    localStorage.setItem("token", token);
    dispatch(login());
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("token");
      dispatch(logout());
      dispatch(clearRatings());
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }
);

export const initAuth = createAsyncThunk(
  "auth/init",
  async (_, { dispatch }) => {
    try {
      localStorage.getItem("token") && dispatch(login());
    } catch (error) {
      console.error("Init failed:", error);
      throw error;
    }
  }
);
