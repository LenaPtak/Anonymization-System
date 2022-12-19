import React from "react";
import "../../css/homepage/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link
        to="/"
        style={{ textDecoration: "none", color: "black", marginRight: "auto" }}
      >
        <img className="header__logo" src="..\images\logo.png" alt="logo" />
      </Link>
      <Link to="/about-us" style={{ textDecoration: "none", color: "black" }}>
        <div className="header__pages">about us</div>
      </Link>
      <Link to="/contact" style={{ textDecoration: "none", color: "black" }}>
        <div className="header__pages">contact</div>
      </Link>
      <Link to="/other" style={{ textDecoration: "none", color: "black" }}>
        <div className="header__pages">other tools</div>
      </Link>
    </div>
  );
}
