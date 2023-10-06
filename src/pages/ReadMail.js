import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/MailboxSideBar";
import { updateEmail } from "../store/email-actions";

const ReadMail = () => {
  const emailAuth = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();

  let mails = "";
  if (emailAuth.isInbox) {
    mails = emailAuth.receivedMails;
  } else if (emailAuth.isSent) {
    mails = emailAuth.sentMails;
  }

  let Email = mails.find((element) => {
    return element.id === params.emailId;
  });

  const mail = { ...Email };
  console.log(mail);
  if (emailAuth.isInbox && mail.isRead === false) {
    mail.isRead = true;
    dispatch(updateEmail(mail, params.emailId));
  }

  const clickHandler = () => {
    history('/inbox');
  };

  return (
    <Fragment>
      <Navbar />
      <div
        className="d-flex "
        style={{ backgroundColor: "lightgrey", height: "100vh" }}
      >
        <SideBar />
        <div
          className="shadow rounded px-4 border border-primary  bg-light"
          style={{
            width: "1000px",
            height: "600px",
            marginLeft: "360px",
            marginTop: "100px",
          }}
        >
          <button
            className="btn fs-5 mb-2 fw-bold "
            style={{ marginLeft: "920px" }}
            onClick={clickHandler}
          >
            X
          </button>
          <div className="d-flex justify-content-between border-bottom border-success border-2">
            <p className="fw-bold">From :{mail.from}</p>
            <p>{mail.date.slice(0, 10)}</p>
          </div>
          <p className="mb-5 border-bottom border-success border-2 py-2">
            To :{mail.to}
          </p>

          <h5>{mail.subject}</h5>
          <p>{mail.content}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ReadMail;
