import React from "react";
import "../../css/steps/Step.css";
import DragDropFile from "./DragDropFile";
import StepsLine from "./StepsLine";
import { Link } from "react-router-dom";


export default function Step() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center step">
      <StepsLine />
      <DragDropFile />
      <Link
          to="select-category"
          style={{ textDecoration: "none", color: "black" }}
        >
          <button className="invite__btn">
            Next step
          </button>
        </Link>
    </div>
  );
}
