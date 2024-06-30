// // src/store/index.ts
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import ratingsReducer from "./ratingsSlice";
// import { thunk } from "redux-thunk";
// import { api } from "./api";

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [api.reducerPath]: api.reducer,
//     ratings: ratingsReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunk, api.middleware),
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ratingsReducer from "./ratingsSlice";
import { thunk } from "redux-thunk";
import { api } from "./api";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const ratingsPersistConfig = {
  key: "ratings",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedRatingsReducer = persistReducer(
  ratingsPersistConfig,
  ratingsReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [api.reducerPath]: api.reducer,
    ratings: persistedRatingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, api.middleware),
});

export const persistor = persistStore(store);
