import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialMail = localStorage.getItem("email");
const initialState = {
  email: initialMail,
  token: initialToken,
  isLogedIn: !!initialToken,
};
const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.isLogedIn = true;
    },
    logout(state) {
      state.isLogedIn = false;
    },
  },
});

export default AuthSlice;
export const authActions = AuthSlice.actions;
