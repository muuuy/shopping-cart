import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import { itemApi } from "../features/itemApi";

export default configureStore({
  reducer: {
    user: userReducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});
