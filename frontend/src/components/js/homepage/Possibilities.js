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
        <div className="col possibilities__item">
          <div className="row possibilities__item__text">
            Select category by which you want to hide the data
          </div>
          <img
            className="row"
            src="..\images\icon1.png"
            style={{
              width: "100%",
              margin: "auto",
              display: "block",
              maxWidth: "100px",
            }}
            alt=""
          />
        </div>

        <div className="col possibilities__item">
          <div className="row possibilities__item__text">
            Upload .pdf .jpg .png .txt files
          </div>
          <img
            className="row"
            src="..\images\icon4.png"
            style={{
              width: "100%",
              margin: "auto",
              display: "block",
              maxWidth: "100px",
            }}
            alt=""
          />
        </div>

        <div className="col possibilities__item">
          <div className="row possibilities__item__text">
            You can enter phrases you want to hide or highlight
          </div>
          <img
            className="row"
            src="..\images\icon3.png"
            style={{
              width: "100%",
              margin: "auto",
              display: "block",
              maxWidth: "100px",
            }}
            alt=""
          />
        </div>

        <div className="col possibilities__item">
          <div className="row possibilities__item__text">
            Anonymization progress report
          </div>
          <img
            className="row"
            src="..\images\icon2.png"
            style={{
              width: "100%",
              margin: "auto",
              display: "block",
              maxWidth: "100px",
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
