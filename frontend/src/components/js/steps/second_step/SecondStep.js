import React from "react";
import "../../../css/steps/Step.css";
import SelectCategory from "./SelectCategory";
import { Link } from "react-router-dom";
import Header from "../../homepage/Header";
import Footer from "../../steps/Footer";
import StepsLine from "../StepsLine";

export default function SecondStep(props) {
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="step__content">
          <StepsLine activeStep={2} />
          <div className="step__form">
            <SelectCategory />
            <div className="d-flex justify-content-between step__buttons">
              {/* <Link
                to="/anonymization/send-files"
                style={{ textDecoration: "none", color: "black" }}
              > */}
              <div className="step__btn__none">Previous step</div>
              {/* </Link> */}
              <Link
                to="/anonymization/phrases"
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
