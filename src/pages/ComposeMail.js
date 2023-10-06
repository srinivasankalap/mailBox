import React, { Fragment, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch} from "react-redux";
import { addEmailData } from "../store/email-actions";
import Navbar from "../components/Navbar";
import SideBar from "../components/MailboxSideBar";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { themeActions } from "../store/theme-reducer";

const ComposeMail = () => {
  const inputEmailRef = useRef("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const [editorState, setEditorState] = useState("");
  const [subject, setSubject] = useState("");
  // const notification = useSelector((state) => state.theme.notification);

  const updateTextDescripton = (state) => {
    let text = "";
    state.blocks.forEach((e) => {
      text = text + e.text;
    });

    setEditorState(text);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    let usermail = localStorage.getItem("email");
    let Email = enteredEmail.replace(/[.]/g, "");
    let todayDate = new Date();
    let sentDate =
      todayDate.getDate() +
      "/" +
      (+todayDate.getMonth() + 1) +
      "/" +
      todayDate.getFullYear() +
      " ";
    let hour =
      todayDate.getHours() > 12
        ? 24 - todayDate.getHours()
        : "0" + todayDate.getHours();
    let a = todayDate.getHours() > 12 ? "pm" : "am";
    let minutes =
      todayDate.getMinutes() < 10
        ? "0" + todayDate.getMinutes()
        : todayDate.getMinutes();

    // let sentTime = hour + ":" + minutes + a;
    let sentMailDateAndTime = sentDate;

    const mailData = {
      from: usermail,
      to: Email,
      subject: subject,
      date: sentMailDateAndTime,
      content: editorState,
      isRead: false,
    };

    dispatch(addEmailData(Email, mailData, history));
    dispatch(themeActions.setmessage("Mail Sent Successfully"));

    // history.push("/inbox");
  };

  const closeHandler = () => {
    history('/inbox');
  };
  return (
    <Fragment>
      <Navbar />
      <div
        className="d-flex"
        style={{height: "100vh" }}
      >
        <SideBar />(
        <form
          className=" w-50  bg-light mx-auto pb-2 rounded shadow "
          style={{ marginLeft: "480px", marginTop: "180px", height: "430px" }}
          onSubmit={clickHandler}
        >
          <div
            className="px-2 py-2 text-white fs-4 fw-bold d-flex justify-content-between"
            style={{
              borderRadius: "8px 8px 0px 0px",
              backgroundColor: "#51087E",
            }}
          >
            <div>
              <FiSend className="mb-1 mx-2" /> New Mail
            </div>
            <button className="btn text-light  fs-5" onClick={closeHandler}>
              X
            </button>
          </div>
          <div className="border-bottom border-secondary border-2 pb-2 p-2 fw-bold">
            {/* <label>To </label> */}
            <input
              type="email"
              className="border-0 ms-2 bg-light px-2"
              style={{ width: "95%" }}
              ref={inputEmailRef}
              placeholder="to: "
              required
            />
          </div>
          <div className="border-bottom border-secondary border-2 py-2 p-2 fw-bold">
            {/* <label>Subject</label> */}
            <input
              type="text"
              className=" border-0 ms-2 bg-light px-2 "
              style={{ width: "90%" }}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject: "
            />
          </div>
          <div className=" mt-2 border-bottom border-secondary border-2 p-2 ">
            {/* <label>ComposeMail</label> */}
            <Editor
              value={editorState}
              toolbarClassName="toolbarClassName "
              wrapperClassName="wrapperClassName bg-light p-2"
              editorClassName="editorClassName bg-white pb-5"
              onContentStateChange={updateTextDescripton}
              placeholder="write your mail here"
            />
          </div>
          <div className="px-2 ">
            <button
              className="btn mt-2 text-white"
              style={{ marginLeft: "600px", backgroundColor: "blue" }}
            >
              Send Email
            </button>
          </div>
        </form>
        )
      </div>
    </Fragment>
  );
};

export default ComposeMail;
