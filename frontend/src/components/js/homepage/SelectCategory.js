import React from "react";
import "../../css/homepage/SelectCategory.css";
import { Link } from "react-router-dom";
import StartBtn from "./StartBtn";

export default function SelectCategory() {
  return (
    <div className="select-category d-flex justify-content-center">
      <img
        className="select-category__photo"
        src="..\images\zdj2.png"
        alt=""
      />
      <div className="select-category__text">
        <h1 className="select-category__tittle">ANONYMIZATION BY CATEGORY.</h1>
        <h5 className="select-category__under-tittle">
          Select categories such as e.g. PESEL, e-mail, telephone numbers and
          other that you want to hide. You can enter the exact phrases too!
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
