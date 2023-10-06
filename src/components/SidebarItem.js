import React from "react";
import "./SidebarItem.css";

const SidebarItem = (props) => {
  return <div className="div">{props.children}</div>;
};

export default SidebarItem;
