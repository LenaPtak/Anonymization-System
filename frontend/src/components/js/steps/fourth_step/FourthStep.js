import React from "react";
import "../../../css/steps/Step.css";
import { Link } from "react-router-dom";
import StepsLine from "../StepsLine";
import Header from "../../homepage/Header";
import Footer from "../../homepage/Footer";
import SelectResult from "./SelectResult";

export default function FourthStep() {
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="step__content">
          <StepsLine activeStep={4} />
          <div className="step__form">
            <SelectResult />
          </div>
          <div class="d-flex justify-content-between step__buttons">
            <Link
              to="/anonymization/select-file-type"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="invite__btn">Previous step</button>
            </Link>
            <button className="invite__btn">Finish!</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
