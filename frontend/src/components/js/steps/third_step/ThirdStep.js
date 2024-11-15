import React from "react";
import "../../../css/steps/Step.css";
import StepsLine from "../StepsLine";
import { Link } from "react-router-dom";
import Header from "../../homepage/Header";
import Footer from "../../steps/Footer";
import SelectFiletype from "./SelectFiletype";

export default function ThirdStep() {
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="step__content">
          <StepsLine activeStep={4} />
          <div className="step__form">
            <SelectFiletype />
            <div className="d-flex justify-content-between step__buttons">
              <Link
                to="/anonymization/phrases"
                style={{ textDecoration: "none", color: "black" }}
              >
                <button className="step__btn">Previous step</button>
              </Link>
              <Link
                to="/anonymization/select-final-result"
                style={{ textDecoration: "none", color: "black" }}
              >
                <button className="step__btn">Next step</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
