import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import EmailList from "../components/emailList/EmailList";
import SideBar from "../components/MailboxSideBar";
import Loader from "../UI/Loader";
import { FiSend } from "react-icons/fi";
import { MdOutlineCallReceived } from "react-icons/md";
import Notification from "../UI/Notification";

const MailDisplay = () => {
  const mailAuth = useSelector((state) => state.email);
  const loader = useSelector((state) => state.theme.loader);
  const notification = useSelector((state) => state.theme.notification);
  let data;
  if (mailAuth.isInbox) {
    data = mailAuth.receivedMails;
  } else if (mailAuth.isSent) {
    data = mailAuth.sentMails;
  }

  const mails = data.map((mail) => {
    return <EmailList key={mail.id} mails={mail} />;
  });

  let m = data.length === 0 ? true : false;

  return (
    <Fragment>
      <Navbar />

      <div className="d-flex">
        <SideBar />
        {notification && <Notification />}
        {loader || (notification && <Loader />)}
        {!loader && !notification && (
          <div
            style={{
              width: "1280px",
              marginTop: "76px",
              // overflow: "scroll",
              marginLeft: "260px",
              // maxmHeight: "90vh",
              minHeight: "90vh",
              height: "100%",
            }}
          >
            <div
              className="mb-2 p-2 "
              style={{
                backgroundColor: "rgb(0,0,0,0.7)",
                position: "fixed",
                width: "100%",
              }}
            >
              <h3 className=" text-white">
                {mailAuth.isInbox ? <MdOutlineCallReceived /> : <FiSend />}{" "}
                {mailAuth.isInbox ? "Inbox" : "Sent"}
              </h3>
            </div>
            {m ? (
              <h4 className="text-center text-light mt-5 pt-5">
                {" "}
                {mailAuth.isInbox
                  ? "Your inbox is Empty"
                  : "Your sent box is Empty"}
              </h4>
            ) : (
              <ul className="p-0 h-100 " style={{ marginTop: "60px" }}>
                {mails}
              </ul>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MailDisplay;
