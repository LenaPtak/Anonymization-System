import React from "react";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";
import "../../css/contact/Contact.css";


export default function Contact() {
  return (
    <div>
      <Header />
      <div className="contact__content row">
        <div className="contact__container col">
          <h1 className="contact__tittle">Contact</h1>
          <div className="contact__description">
            <li>lena.ptak@student.put.poznan.pl</li>
            <li>tomasz.piescikowski@student.put.poznan.pl</li>
            <li>anastasiia.trubchaninova@student.put.poznan.pl</li>
            <li>jan.bylicki@student.put.poznan.pl</li>
          </div>
          <div className="contact__invite">
            Please feel free to contact us if you have any questions.
          </div>
        </div>
        <div className="contact__container col">
          <img className="contact__logo" src="..\images\logoPP.png" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
