import React from "react";
import Footer from "./components/UI/Footer";
//import MeetingIcon from "./images/meeting.png";

import Navbar from "./components/UI/Navbar";
//import ChangePassword from './components/Login/ChangePassword';

function Message() {
  //const [show,setShow]=useState(false)
  return (
    <div>
      <Navbar name="Meeting & Tours" />
      <h1 style={{ height: "100vh", backgroundColor: "white" }}>
        Authenticated
      </h1>
      <Footer />
    </div>
  );
}

export default Message;
