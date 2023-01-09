import React from "react";
import Header from "../homepage/Header";
import Footer from "../steps/Footer";
import "../../css/about_us/AboutUs.css";

export default function OtherTools() {
  return (
    <div>
      <Header />
      <div className="about-us__content row">
        <div className="about-us__container col">
          <h1 className="about-us__tittle">Other tools</h1>
          <div className="about-us-description">
            In the near future, we are planning new solutions that will provide
            our users with even more satisfaction and satisfaction with our
            services.
          </div>
        </div>
        <div className="about-us__container col">
          <img className="about-us__logo" src="..\images\logoPP.png" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
