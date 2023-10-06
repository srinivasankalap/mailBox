import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-reducer";
import emailSlice from "./email-reducer";
import themeSlice from "./theme-reducer";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer, email: emailSlice.reducer,theme:themeSlice.reducer },
});

export default store;
