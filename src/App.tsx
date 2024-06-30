// import { useState } from 'react'
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import { useEffect } from "react";
import { initAuth } from "./redux/authThunks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "movie/:movieId",
    element: <MoviePage />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>;
    </Provider>
  );
}

export default App;
