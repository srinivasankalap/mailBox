import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeEmail } from "../../store/email-actions";
import "./EmailList.css";
import { themeActions } from "../../store/theme-reducer";

const EmailList = (props) => {
  const history = useNavigate();
  const emailAuth = useSelector((state) => state.email);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let dataType;
  if (emailAuth.isInbox) {
    dataType = "inbox";
  } else if (emailAuth.isSent) {
    dataType = "sent";
  }

  let mail = "";
  if (emailAuth.isInbox) {
    mail = props.mails.from;
  } else if (emailAuth.isSent) {
    mail = props.mails.to;
  }

  let shortContent = "";
  if (props.mails.content.length > 80) {
    shortContent = props.mails.content.slice(0, 80);
  } else if (props.mails.content.length < 80) {
    shortContent = props.mails.content;
  }

  const readMailHandler = () => {
    history(`/email/${props.mails.id}`);
  };

  const removeHandler = () => {
    dispatch(themeActions.setmessage("Mail Deleted Successfully"));
    dispatch(removeEmail(auth.email, dataType, props.mails.id));
  };

  return (
    <Fragment>
      <li className="d-flex justify-content-between align-items-center  p-2 mb-1 rounded email-item">
        <div className="d-flex" onClick={readMailHandler}>
          <div className=" fw-bold d-flex" style={{ width: "260px" }}>
            <div
              className="me-3 mt-1"
              style={{
                border: "2px solid grey",
                width: "16px",
                height: "16px",
              }}
            ></div>
            {!props.mails.isRead && emailAuth.isInbox && (
              <div
                className="me-3 mt-2 bg-primary"
                style={{ borderRadius: "50%", width: "10px", height: "10px" }}
              ></div>
            )}
            {mail}
          </div>
          <div style={{ width: "800px" }}>{shortContent}</div>
        </div>
        <div className="d-flex  justify-content-between align-items-center ">
          <span>{props.mails.date.slice(0, 10)}</span>
          <button className="btn border-0" onClick={removeHandler}>
            <MdDelete
              size={"20px"}
              className=" ms-5"
              style={{ color: "#f11712" }}
            />
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default EmailList;
