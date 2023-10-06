import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  notification: false,
  message: "",
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    showLoading(state, action) {
      state.loader = true;
    },
    hideLoading(state) {
      state.loader = false;
    },
    showNotification(state) {
      state.notification = true;
    },
    hideNotification(state) {
      state.notification = false;
    },
    setmessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
