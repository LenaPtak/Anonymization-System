import React from "react";
import "../../css/homepage/SelectCategory.css";
import { Link } from "react-router-dom";
import StartBtn from "./StartBtn";

export default function SelectCategory() {
  return (
    <div className="select-category d-flex justify-content-center">
      <img className="select-category__photo" src="..\images\zdj4.png" alt="" />
      <div className="select-category__text">
        <h1 className="select-category__tittle">ANONYMIZATION REPORT.</h1>
        <h5 className="select-category__under-tittle">
          Things getting chaotic? Optionally, you can download a report on the
          anonymization of your files. It contains all processing information.
        </h5>
        <Link
          to="/anonymization/send-files"
          style={{ textDecoration: "none", color: "black" }}
        >
          <StartBtn />
        </Link>
      </div>
    </div>
  );
}
