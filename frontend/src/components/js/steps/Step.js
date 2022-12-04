import React, { useState } from "react";
import "../../css/steps/Step.css";
// import DownloadFile from "./DownloadFile";
import DragDropFile from "./DragDropFile";
import StepsLine from "./StepsLine";

export default function Step() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center step">
      <StepsLine />
      <DragDropFile />
      {/* <DownloadFile /> */}
    </div>
  );
}
