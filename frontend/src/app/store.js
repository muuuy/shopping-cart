import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import searchReducer from "../features/searchSlice";
import { itemApi } from "../features/itemApi";

export default configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});
