import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loader;
