import React from "react";
import "../../css/steps/StepsLine.css";

export default function StepsLine(props) {
  const { activeStep } = props;
  return (
    <div className="d-flex justify-content-center align-items-center steps-line">
      <div className="d-flex justify-content-around align-items-center steps-line__line">
        <div
          className={`steps-line__circle${activeStep === 1 ? "-active" : ""}`}
        ></div>
        <div
          className={`steps-line__circle${activeStep === 2 ? "-active" : ""}`}
        ></div>
        <div
          className={`steps-line__circle${activeStep === 3 ? "-active" : ""}`}
        ></div>
        <div
          className={`steps-line__circle${activeStep === 4 ? "-active" : ""}`}
        ></div>
      </div>
    </div>
  );
}
