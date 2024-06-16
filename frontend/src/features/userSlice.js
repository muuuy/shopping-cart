import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  username: "",
  email: "",
  cart: [],
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.authenticated = true;
      state.cart = action.payload.cart;
    },
    removeUser(state) {
      state.username = "";
      state.email = "";
      state.authenticated = false;
    },
    cartAppend(state, action) {
      state.cart.push(action.payload.item);
    },
  },
});

export const { authUser, removeUser, cartAppend } = userSlice.actions;

export default userSlice.reducer;
