import React from "react";
import "../../css/steps/StepsLine.css";

export default function StepsLine() {
  return (
    <div className="d-flex justify-content-center align-items-center steps-line">
      <div className="d-flex justify-content-around align-items-center steps-line__line">
        <div className="steps-line__circle-active"></div>
        <div className="steps-line__circle"></div>
        <div className="steps-line__circle"></div>
        <div className="steps-line__circle"></div>
      </div>
    </div>
  );
}
