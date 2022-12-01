import React from "react";
import "../../css/homepage/Header.css";

export default function Header() {
  return (
    <div className="header">
      <img className="header__logo" src="..\images\logo.png" alt="logo" />
      <div className="header__pages">about us</div>
      <div className="header__pages">contact</div>
      <div className="header__pages">other tools</div>
    </div>
  );
}
