import React from "react";
import Header from "../homepage/Header";
import Spinner from "./Spinner";
import Footer from "../steps/Footer";
import "../../css/steps/LoadingPage.css";

export default function LoadingPage() {
  return (
    <div>
      <Header />
      <div className="loading">
        <div className="loading__container">
          <div className="loading__content">
            <div className="loading__text">
              <h1 className="loading__title">Please wait..</h1>
              <h3 className="loading__subtitle">
                your files will be downloaded soon! :)
              </h3>
            </div>
          </div>
          <Spinner />
        </div>
      </div>
      <Footer />
    </div>
  );
}
