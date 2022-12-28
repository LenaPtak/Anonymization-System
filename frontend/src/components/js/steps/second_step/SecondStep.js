import React from "react";
import "../../../css/steps/Step.css";
import SelectCategory from "./SelectCategory";
import { Link } from "react-router-dom";
import Header from "../../homepage/Header";
import StepsLine from "../StepsLine";

export default function SecondStep() {
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="d-flex flex-column justify-content-center align-items-center step__content">
          <StepsLine activeStep={2} />
          <div className="d-flex flex-column justify-content-center align-items-center step__form">
            <SelectCategory />
          </div>
          <div class="d-flex justify-content-between step__buttons">
            <Link
              to="/anonymization/send-files"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="step__btn">Previous step</button>
            </Link>
            <Link
              to="/anonymization/select-file-type"
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
