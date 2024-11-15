import React from "react";
import "../../../css/steps/Step.css";
import { Link } from "react-router-dom";
import Header from "../../homepage/Header";
import Footer from "../Footer";
import StepsLine from "../StepsLine";
import Content from "./Content";

export default function PhrasesStep() {
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="step__content">
          <StepsLine activeStep={3} />
          <div className="step__form">
            <Content />
            <div className="d-flex justify-content-between step__buttons">
              <Link
                to="/anonymization/select-category"
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
      <Footer />
    </div>
  );
}
