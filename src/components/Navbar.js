import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-reducer";
import { GiMailbox } from "react-icons/gi";

const Navbar = () => {
  const logedIn = useSelector((state) => state.auth.isLogedIn);
  const dispatch = useDispatch();
  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logout());
    history('/login', {replace: true});
  };

  console.log("Navbar RUNNING...");
  return (
    <nav
      className="navbar navbar-light  shadow "
      style={{
        background: " linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(122,120,159,1) 100%)",
        position: "fixed",
        width: "100%",
        top: "0px",
      }}
    >
      <div className="container-fluid" style={{ height: "60px", fontFamily: "monospace" }}>
        <a className="navbar-brand text-white fs-2 fw-bold">
          {" "}
          <GiMailbox className="me-5 mb-2" style={{ color: "#ffffff" }} />
          MailBox Client
        </a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>

          {logedIn && (
            <button
              className="btn btn-danger fs-5 text-white ms-5"
              style={{boxShadow: "2px 1px 3px #000000"}}
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
