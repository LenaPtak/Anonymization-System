import React from "react";
import "../../../css/steps/Step.css";
import { Link } from "react-router-dom";
import StepsLine from "../StepsLine";
import Header from "../../homepage/Header";
import Footer from "../../steps/Footer";
import SelectResult from "./SelectResult";
import DownloadFile from "../first_step/DownloadFile";
import FinishBtn from "./FinishBtn";

export default function FourthStep() {
  function deleteSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        // this callback function is executed when the promise is fulfilled
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          return {
            tip: "You have no permission to delete session, probably was already deleted or not yet created. Check your cookies.",
          };
        } else {
          throw new Error(
            "Communication between React and FastAPI is not working. Something went wrong."
          );
        }
      })
      .then((data) => {
        // this callback function is executed when the promise is fulfilled
        // console.log(data);
      })
      .catch((error) => {
        // this callback function is executed when the promise is rejected
        console.error(error);
      });
  }
  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="step__content">
          <StepsLine activeStep={4} />
          <div className="step__form">
            <SelectResult />
            <div className="d-flex justify-content-between step__buttons">
              <Link
                to="/anonymization/select-file-type"
                style={{ textDecoration: "none", color: "black" }}
              >
                <button className="step__btn">Previous step</button>
              </Link>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "black" }}
              >
                <FinishBtn />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
