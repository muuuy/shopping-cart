import { createSlice } from "@reduxjs/toolkit";

// const sessionExists = !!

const initialState = {
  authenticated: false,
  username: "",
  email: "",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.authenticated = true;
    },
    removeUser(state) {
      state.username = "";
      state.email = "";
      state.authenticated = false;
    },
  },
});

export const { authUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
