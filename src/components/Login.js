import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/auth-actions";
import Navbar from "./Navbar";
import { themeActions } from "../store/theme-reducer";
import Notification from "../UI/Notification";
import Loader from "../UI/Loader";

const Login = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.theme.loader);
  const notification = useSelector((state) => state.theme.notification);

  const loginHandler = (e) => {
    dispatch(themeActions.showLoading());
    dispatch(themeActions.setmessage("Logged In Successfully"));
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    dispatch(loginUser(user, history));
  };

  const signupHandler = () => {
    history("/signup");
  };
  return (
    <Fragment>
      <Navbar />
      {loader || (notification && <Loader />)}
      {notification && <Notification />}
      {!loader && !notification && (
        <div
          className=" shadow w-25   mx-auto  "
          style={{
            background:"beige",
            marginTop: "160px",
            borderRadius: "20px"
          }}
        >
          <form className=" w-100 p-3 " onSubmit={loginHandler}>
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                required
                ref={inputEmailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                ref={inputPasswordRef}
              />
            </div>

            <div className="d-flex justify-content-start">
              <button className="btn  mb-2 " style={{ border: "none" }}>
                Forgot Password?
              </button>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn w-100 mt-2 p-2 text-light btn-primary"
                style={{
                  background: " linear-gradient(to right, #00b09b , #96c93b)",
                  border: "none",
                }}
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <button
              className="btn w-100 mb-4 border-0"
              onClick={signupHandler}
              // style={{ border: "none" }}
            >
              Dont have an account? SignUp
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
