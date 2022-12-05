import React from "react";
import "../../css/steps/SelectCategory.css";

export default function SelectCategory() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center select__model">
        <h5>Select type</h5>
        <li>model</li>
        <li>regex</li>
        <h5>Select categories:</h5>
        <li>PESEL</li>
        <li>phone number</li>
        <li>NIP</li>
      </div>
    </div>
  );
}
