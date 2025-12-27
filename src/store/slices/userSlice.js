import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    data: null,
  },
  reducers: {
    signedUserData: (state, action) => {
      state.data = action.payload;
    },
    clearSignedUserData: (state, action) => {
      state.data = null;
    },
  },
});

export const { signedUserData, clearSignedUserData } = userSlice.actions;
export default userSlice.reducer;
