import React, { useState } from "react";
import "../../../css/steps/Step.css";
import DragDropFile from "./DragDropFile";
import StepsLine from "../StepsLine";
import Footer from "../../steps/Footer";
import { Link } from "react-router-dom";
import Header from "../../homepage/Header";

export default function Step() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = (files) => {
    setUploadedFiles(files);

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("uploaded_files", file, file.name);
    });

    fetch("http://localhost:8000/api/files", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .catch((e) => console.log(`e: ${e}`));
  };

  const updateUploadedFiles = (files) => {
    setUploadedFiles(files);
  };

  return (
    <div className="step">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center step__container">
        <div className="step__content">
          <StepsLine activeStep={1} />
          <div className="step__form">
            <DragDropFile updateUploadedFiles={updateUploadedFiles} />
            <div className="d-flex flex-row-reverse step__buttons">
              <Link
                to={{
                  pathname: "/anonymization/select-category",
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <button
                  className="step__btn"
                  onClick={() => handleSubmit(uploadedFiles)}
                >
                  Next step
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
