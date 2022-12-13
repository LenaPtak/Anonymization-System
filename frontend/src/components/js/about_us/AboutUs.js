import React from "react";
import "../../css/about_us/AboutUs.css";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div>
      <Header />
      <div className="about-us__content row">
        <div className="about-us__container col">
          <h1 className="about-us__tittle">
            We are students of Computer Science in Poznań
          </h1>
          <div className="about-us-description">
            We are a group of four students who, as part of their engineering
            thesis, created a document anonymization system. As young people
            full of enthusiasm and commitment, we want to develop our skills and
            gain new experience, striving to become professionals in our field.
            We are open to new ideas and willing to exchange experiences and
            knowledge with other people.
          </div>
          <Link to="/contact" style={{ color: "black" }}>
            <p className="about-us__contact">
              If you want to contact us, please click here.
            </p>
          </Link>
        </div>
        <div className="about-us__container col">
          <img className="about-us__logo" src="..\images\logoPP.png" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}