import React from "react";
import { Link } from "react-router-dom";
import "../../css/homepage/Footer.css";

export default function Footer() {
  return (
    <div>
      <div className="homepage-footer">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            marginRight: "auto",
          }}
        >
          <img
            className="homepage-footer__logo"
            src="..\images\logo.png"
            alt="logo"
          />
        </Link>
        <Link to="/about-us" style={{ textDecoration: "none", color: "black" }}>
          <div className="homepage-footer__title">about us</div>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "black" }}>
          <h1 className="homepage-footer__title">contact</h1>
        </Link>
        <Link to="/other" style={{ textDecoration: "none", color: "black" }}>
          <div className="homepage-footer__title">other tools</div>
        </Link>
      </div>
    </div>
  );
}
