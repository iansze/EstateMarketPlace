import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearchTerm: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentSearchTerm: (state, action) => {
      state.currentSearchTerm = action.payload;
    },
  },
});

export const { setCurrentSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
