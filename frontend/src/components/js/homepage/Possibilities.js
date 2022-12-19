import React from "react";
import "../../css/homepage/Possibilities.css";

export default function Possibilities() {
  return (
    <div className="possibilities d-flex flex-column justify-content-center">
      <div className="possibilities__text">
        <h1 className="d-flex justify-content-center possibilities__tittle">
          Your possibilities
        </h1>
        <h5 className="d-flex justify-content-center possibilities__under-tittle">
          Thanks for considering using our anonymization tool. We understand
          that privacy is important to you, and that's why we offer you the
          ability to customize your anonymization experience.
        </h5>
      </div>
      <div className="d-flex justify-content-center possibilities__items">
        <div className="d-flex align-items-center possibilities__item">
          Select category by which you want to hide the data
        </div>
        <div className="d-flex align-items-center possibilities__item">
          Converting .pdf .jpg .png files
        </div>
        <div className="d-flex align-items-center possibilities__item">
          You can enter the exact phrases you want to hide
        </div>
        <div className="d-flex align-items-center possibilities__item">
          You can choose whether you want to combine the documents or prefer
          each one separately
        </div>
      </div>
    </div>
  );
}
