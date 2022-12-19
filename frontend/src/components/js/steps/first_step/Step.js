import React from "react";
import "../../../css/steps/Step.css";
import DragDropFile from "./DragDropFile";
import StepsLine from "../StepsLine";
import { Link } from "react-router-dom";
import Header from "../../homepage/Header";

export default function Step() {
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="d-flex flex-column justify-content-center align-items-center step__content">
          <StepsLine />
          <div className="d-flex flex-column justify-content-center align-items-center step__form">
            <DragDropFile />
          </div>
          <div class="d-flex flex-row-reverse step__buttons">
            <Link
              to="/anonymization/select-category"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="step__btn">Next step</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
