import React from "react";
import "../../css/homepage/Invite.css";
import { Link } from "react-router-dom";
import StartBtn from "./StartBtn";

export default function Converting() {
  return (
    <div className="invite d-flex justify-content-center">
      <div className="invite__text">
        <h1 className="invite__tittle">CONVERT YOUR FILES.</h1>
        <h5 className="invite__under-tittle">
          If you want, you can convert your files in .pdf .jpg .jpeg and .png
          formats in any direction.
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
