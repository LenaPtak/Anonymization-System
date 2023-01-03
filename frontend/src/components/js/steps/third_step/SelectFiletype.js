import React from "react";
import "../../../css/steps/third_step/SelectFiletype.css";
import AllFilesType from "./AllFilesType";
import Scrollable from "./Scrollable";

export default function SelectFiletype() {
  return (
    <div className="row g-3">
      <div className="col select-filetype__search">
        <Scrollable />
      </div>
      <div className="col select-filetype__all-files">
        <AllFilesType />
      </div>
    </div>
  );
}
