import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailActions } from "../store/email-reducer";
import { FiSend } from "react-icons/fi";
import { RiEditFill } from "react-icons/ri";
import { FiStar } from "react-icons/fi";
import { MdDrafts } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import './MailboxSideBar.css';

const SideBar = () => {
  const inboxMails = useSelector((state) => state.email.receivedMails);
  const sentMails = useSelector((state) => state.email.sentMails);
  const usermail = localStorage.getItem("email");
  const dispatch = useDispatch();
  const history = useNavigate();

  let unreadMailCount = 0;
  inboxMails.forEach((element) => {
    if (element.isRead === false) {
      unreadMailCount = unreadMailCount + 1;
    }
  });

  let sentMailCount = 0;
  sentMails.forEach((mail) => {
    sentMailCount = sentMailCount + 1;
  });

  const idx = usermail.indexOf("@");

  const inboxHandler = () => {
    console.log(usermail);
    // dispatch(fetchEmailData(usermail));
    dispatch(emailActions.fetchInboxData());
    history('/inbox');
  };

  const sentHandler = () => {
    dispatch(emailActions.fetchSentData());
    // dispatch(fetchEmailData(usermail));
    history('/inbox');
  };

  const composeHandler = () => {
    history('/compose');
  };

  return (
    <div
      className=" text-light"
      style={{
        height: "90vh",
        minWidth: "260px",
        backgroundColor: "rgb(0, 0, 0, 0.7)",
        marginTop: "76px",
        position: "fixed",
      }}
    >
      <div className="fs-5 mb-4 p-2">
        <em>Welcome,</em>{" "}
        <span className="text-success fw-bold">{usermail.slice(0, idx)}</span>{" "}
      </div>
      <div className="text-center mb-5">
        <button
          id="compose"
          className="btn w-50 text-light border border-2"
          style={{ backgroundColor: "purple" }}
          onClick={composeHandler}
        >
          <RiEditFill /> Compose
        </button>
      </div>

      <SidebarItem>
        <button className="btn  w-100   py-3 text-light" onClick={inboxHandler}>
          <MdMail className="mb-1 me-3" /> Inbox
        </button>
        <div
          className=" text-white"
          style={{
            width: "23px",
            height: "23px",
            borderRadius: "40%",
            // position: "absolute",
            left: "200px",
            top: "250px",
            // backgroundColor: "orange",
            position: "fixed",
          }}
        >
          {" "}
          {unreadMailCount}
        </div>
      </SidebarItem>
      <SidebarItem className="  border-bottom border-2 ">
        <button className="btn w-100 py-3 text-light">
          <FiStar className="mb-1 me-3" /> Starred
        </button>
      </SidebarItem>
      <SidebarItem className="  border-bottom border-2 ">
        <button className="btn  w-100  py-3 text-light">
          <MdDrafts className="mb-1 me-4" /> Draft
        </button>
      </SidebarItem>
      <SidebarItem className="border-bottom border-2">
        <button className="btn  w-100  py-3 text-light" onClick={sentHandler}>
          <FiSend className="mb-1 me-4" /> Sent
        </button>
        <div
          className=" text-white "
          style={{
            width: "23px",
            height: "23px",
            borderRadius: "40%",
            position: "fixed",
            left: "200px",
            top: "422px",
            // backgroundColor: "orange",
          }}
        >
          {" "}
          {sentMailCount}
        </div>
      </SidebarItem>
      <SidebarItem className=" border-bottom border-2  ">
        <button className="btn  w-100  py-3 text-light">
          <BsTrash className="mb-1 me-4" /> Trash
        </button>
      </SidebarItem>
    </div>
  );
};

export default SideBar;
