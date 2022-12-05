import React from "react";
import "../../css/homepage/SelectCategory.css";

export default function SelectCategory() {
  return (
    <div className="select-category d-flex justify-content-center">
      <img
        className="select-category__photo"
        src="..\images\homepage4.svg"
        alt=""
      />
      <div className="select-category__text">
        <h1 className="select-category__tittle">MERGE OR SPLIT.</h1>
        <h5 className="select-category__under-tittle">
          Things getting chaotic? Merge and split files, or remove excess pages.
          Smallpdf has it all.
        </h5>
        <button className="select-category__btn">
          Let's anonymize some documents
        </button>
      </div>
    </div>
  );
}
