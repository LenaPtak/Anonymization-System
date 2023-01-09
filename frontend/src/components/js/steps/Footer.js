import React from "react";
import "../../css/steps/Footer.css";

export default function Footer() {
  return (
    <div className="step-footer">
      <img className="step-footer__logo" src="..\images\logo.png" alt="logo" />
      <h1 className="step-footer__title">Team</h1>
      <h1 className="step-footer__title">History</h1>
      <h1 className="step-footer__title">Contact us</h1>
    </div>
  );
}
