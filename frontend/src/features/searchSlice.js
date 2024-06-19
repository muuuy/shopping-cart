import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  searchType: "pokemon",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch(state, action) {
      state.searchValue = action.payload.searchValue;
      state.searchType = action.payload.searchType;
    },
  },
});

export const { updateSearch } = searchSlice.actions;

export default searchSlice.reducer;