import React from "react";
import Profile from "./Profile";
import "../styles/Footer.css";
import ChangeBgColor from "./ChangeBgColor";
const Footer = () => {
  return (
    <div className="footer">
<ChangeBgColor/>
      <Profile />
    </div>
  );
};

export default Footer;
