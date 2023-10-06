import { emailActions } from "./email-reducer";
import useFetch from "../customHooks/useFetch";
import { themeActions } from "./theme-reducer";

export const addEmailData = (email, body, h) => {
  return async (dispatch) => {
    try {
      const response = await useFetch(
        `https://mail-box-bbc42-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/inbox.json`,
        "POST",
        body
      );

      if (response) {
        dispatch(themeActions.showNotification());

        setTimeout(() => {
          dispatch(themeActions.hideNotification());
        }, 2000);

        h("/inbox");
        console.log("in");
        let sEmail = localStorage.getItem("email");

        const response2 = await useFetch(
          `https://mail-box-bbc42-default-rtdb.asia-southeast1.firebasedatabase.app/${sEmail}/sent.json`,
          "POST",
          body
        );
        const myMail = localStorage.getItem("email");
        if (response2.ok) {
          dispatch(fetchEmailData(myMail));
        }
      } else {
        const errorMessage = "sending mail failed...";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const fetchEmailData = (myMail) => {
  return async (dispatch) => {
    try {
      dispatch(themeActions.showLoading());
      const response = await useFetch(
        `https://mail-box-bbc42-default-rtdb.asia-southeast1.firebasedatabase.app/${myMail}.json`
      );

      if (response.ok) {
        dispatch(themeActions.hideLoading());

        const data = await response.json();
        if (data === null) {
          let sentMail = [];
          let receivedMail = [];
          dispatch(emailActions.updateEmailData({ receivedMail, sentMail }));
          return;
        }

        console.log(data);
        const sentMails = data.sent;
        const receivedMails = data.inbox;
        console.log(sentMails);

        let sentMail = [];
        let receivedMail = [];

        for (let key in sentMails) {
          let body = sentMails[key];
          sentMail.push({
            id: key,
            to: body.to,
            from: body.from,
            date: body.date,
            subject: body.subject,
            content: body.content,
            isRead: body.isRead,
          });
        }

        for (let key in receivedMails) {
          let body = receivedMails[key];
          receivedMail.push({
            id: key,
            to: body.to,
            from: body.from,
            date: body.date,
            subject: body.subject,
            content: body.content,
            isRead: body.isRead,
          });
        }

        dispatch(emailActions.updateEmailData({ receivedMail, sentMail }));
      } else {
        let errorMessage = "sending mail failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const updateEmail = (emailObj, id) => {
  return async (dispatch) => {
    try {
      const response = await useFetch(
        `https://mail-box-bbc42-default-rtdb.asia-southeast1.firebasedatabase.app/${emailObj.to}/inbox/${id}.json`,
        "PUT",
        emailObj
      );
      if (response.ok) {
        dispatch(fetchEmailData(emailObj.to));
      } else {
        let errorMessage = "updating mail failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const removeEmail = (email, type, id) => {
  let deleteKey;
  if (type === "inbox") {
    deleteKey = "inbox";
  } else if (type === "sent") {
    deleteKey = "sent";
  }
  return async (dispatch) => {
    try {
      const response = await useFetch(
        `https://mail-box-bbc42-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/${deleteKey}/${id}.json`,
        "DELETE"
      );
      if (response.ok) {
        // alert("mail Deleted Successfully");
        dispatch(fetchEmailData(email));
        dispatch(themeActions.showNotification());
        setTimeout(() => {
          dispatch(themeActions.hideNotification());
        }, 2000);
      } else {
        let errorMessage = "deleting mail failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
