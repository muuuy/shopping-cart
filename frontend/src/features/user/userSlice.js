import { createSlice } from "@reduxjs/toolkit";

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

export default userSlice.reducer;
