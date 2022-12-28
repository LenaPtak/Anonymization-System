import React from "react";
import "../../../css/steps/third_step/AllFilesType.css";

export default function AllFilesType() {
  const [selectedFileType, setSelectedFileType] = React.useState(null);

  const handleChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  return (
    <div className="all-files-type">
      <div className="all-files-type__title">
        Choose your final filetype for all files:
      </div>
      <div className="row">
        <div
          className={`file-type-tile ${
            selectedFileType === ".jpg" ? "selected" : ""
          }`}
          onClick={() => setSelectedFileType(".jpg")}
        >
          <input
            type="radio"
            name="filetype"
            id="jpg"
            value=".jpg"
            checked={selectedFileType === ".jpg"}
            onChange={handleChange}
          />
          <div className="file-type-extension">.jpg</div>
        </div>
        <div
          className={`file-type-tile ${
            selectedFileType === ".pdf" ? "selected" : ""
          }`}
          onClick={() => setSelectedFileType(".pdf")}
        >
          <input
            type="radio"
            name="filetype"
            id="pdf"
            value=".pdf"
            checked={selectedFileType === ".pdf"}
            onChange={handleChange}
          />
          <div className="file-type-extension">.pdf</div>
        </div>
      </div>
      <div className="row">
        <div
          className={`file-type-tile ${
            selectedFileType === ".txt" ? "selected" : ""
          }`}
          onClick={() => setSelectedFileType(".txt")}
        >
          <input
            type="radio"
            name="filetype"
            id="txt"
            value=".txt"
            checked={selectedFileType === ".txt"}
            onChange={handleChange}
          />
          <div className="file-type-extension">.txt</div>
        </div>
        <div
          className={`file-type-tile ${
            selectedFileType === ".png" ? "selected" : ""
          }`}
          onClick={() => setSelectedFileType(".png")}
        >
          <input
            type="radio"
            name="filetype"
            id="png"
            value=".png"
            checked={selectedFileType === ".png"}
            onChange={handleChange}
          />
          <div className="file-type-extension">.png</div>
        </div>
      </div>
    </div>
  );
}
