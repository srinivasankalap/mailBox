import useFetch from "../customHooks/useFetch";
import { authActions } from "./auth-reducer";
import { fetchEmailData } from "./email-actions";
import { themeActions } from "./theme-reducer";

export const signupUser = (user, history) => {
  return async (dispatch) => {
    try {
      if (user.password === user.confirmPassword) {
        const response = await useFetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANmYbMvsaABkpxPc54L-7D-EMwqQgrKMU",
          "POST",
          {
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          }
        );
        if (response.ok) {
          dispatch(themeActions.showNotification());
          setTimeout(() => {
            dispatch(themeActions.hideNotification());
          }, 2000);
          // alert("Successfully Signed Up...");
          console.log("Successfully Signed Up...");
          dispatch(themeActions.hideLoading());
          history.push("/login");
        } else {
          let errorMessage = "Authentication Failed...";
          throw new Error(errorMessage);
        }
      } else {
        alert("Password Incorrect");
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const loginUser = (user, history) => {
  return async (dispatch) => {
    try {
      const response = await useFetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANmYbMvsaABkpxPc54L-7D-EMwqQgrKMU",
        "POST",
        {
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(themeActions.showNotification());
        setTimeout(() => {
          dispatch(themeActions.hideNotification());
        }, 2000);
        dispatch(fetchEmailData(data.email.replace(/[.]/g, "")));
        dispatch(
          authActions.login({
            token: data.idToken,
            email: data.email.replace(/[.]/g, ""),
          })
        );
        dispatch(themeActions.hideLoading());
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email.replace(/[.]/g, ""));
        history("/inbox", {replace: true});
      } else {
        let errorMessage = "login failed...";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
