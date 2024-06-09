import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ authenticated: false }];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
