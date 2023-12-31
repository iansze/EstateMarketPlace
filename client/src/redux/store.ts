import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducer from "./feature/searchSlice";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  //local storage
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
