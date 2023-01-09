import React from "react";
import "../../css/homepage/SelectCategory.css";
import { Link } from "react-router-dom";
import StartBtn from "./StartBtn";

export default function SelectCategory() {
  return (
    <div className="select-category d-flex justify-content-center">
      <img
        className="select-category__photo"
        src="..\images\zdj4.png"
        alt=""
      />
      <div className="select-category__text">
        <h1 className="select-category__tittle">MERGE OR SPLIT.</h1>
        <h5 className="select-category__under-tittle">
          Things getting chaotic? Merge and split files, or remove excess pages.
          Smallpdf has it all.
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
