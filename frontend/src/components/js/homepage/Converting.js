import React from "react";
import "../../css/homepage/Invite.css";
import { Link } from "react-router-dom";
import StartBtn from "./StartBtn";

export default function Converting() {
  return (
    <div className="invite d-flex justify-content-center">
      <div className="invite__text">
        <h1 className="invite__tittle">DIFFERENT TYPES OF FILES.</h1>
        <h5 className="invite__under-tittle">
          Ability to upload files in up to four different formats: .pdf, .png,
          .jpg and .txt. We have this all.
        </h5>
        <Link
          to="/anonymization/send-files"
          style={{ textDecoration: "none", color: "black" }}
        >
          <StartBtn />
        </Link>
      </div>
      <img className="invite__photo" src="..\images\zdj3.png" alt="" />
    </div>
  );
}
