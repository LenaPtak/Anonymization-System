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
          You can choose the exact settings according to your needs.
        </h5>
      </div>
      <div className="d-flex justify-content-center possibilities__items">
        <div className="possibilities__item">Opcja 1</div>
        <div className="possibilities__item">Opcja 2</div>
        <div className="possibilities__item">Opcja 3</div>
      </div>
    </div>
  );
}
