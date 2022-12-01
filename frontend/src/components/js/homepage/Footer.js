import React from "react";
import "../../css/homepage/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <img className="footer__logo" src="..\images\logo.png" alt="logo" />
      <h1 className="footer__title">Team</h1>
      <h1 className="footer__title">History</h1>
      <h1 className="footer__title">Contact us</h1>
    </div>
  );
}
