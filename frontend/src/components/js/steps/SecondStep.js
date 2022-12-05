import React from "react";
import "../../css/steps/Step.css";
import SelectCategory from "./SelectCategory";
import StepsLine from "./StepsLine";

export default function SecondStep() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center step">
      <StepsLine />
      <SelectCategory />
    </div>
  );
}
