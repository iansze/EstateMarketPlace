import { createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "../../components/types/Types";

const initialState = {
  currentUser: null as CurrentUser | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
