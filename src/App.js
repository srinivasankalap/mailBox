import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ComposeMail from "./pages/ComposeMail";
import MailDisplay from "./pages/MailDisplay";
import { useDispatch, useSelector } from "react-redux";
import ReadMail from "./pages/ReadMail";
import { fetchEmailData } from "./store/email-actions";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmailData(auth.email));
  }, [auth.email, dispatch]);

  return (
    <div className="App ">
      <Routes>
        <Route path="/" exact element={<Navigate to="/login"/>}>
        </Route>
        <Route path="/home" element={<Home/>}/>
        <Route path="/compose" element={<ComposeMail/>}/>
        <Route path="/email/:emailId" exact element={<ReadMail/>}/>
        <Route path="/inbox" element={<MailDisplay/>}/> 
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
