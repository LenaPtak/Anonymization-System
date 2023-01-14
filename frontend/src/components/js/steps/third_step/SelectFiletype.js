import React, { useState } from "react";
import "../../../css/steps/third_step/SelectFiletype.css";
import AllFilesType from "./AllFilesType";
import Scrollable from "./Scrollable";

export default function SelectFiletype() {
  const [selectedFileType, setSelectedFileType] = useState("");
  const [clickFlag, setClickFlag] = useState(false);

  const handleClick = (filetype) => {
    setSelectedFileType(filetype);
  };

  const handleFlag = () => {
    setClickFlag(false);
  };

  return (
    <div className="row g-3">
      <div className="col select-filetype__all-files">
        <AllFilesType handleClick={handleClick} handleFlag={handleFlag} />
      </div>
      <div className="col">
        <Scrollable selectedFileType={selectedFileType} clickFlag={clickFlag} />
      </div>
    </div>
  );
}
