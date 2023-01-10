import React, { useState } from "react";
import "../../../css/steps/first_step/DragDropFile.css";

const MAX_COUNT_FILES = 10;

export default function DragDropFile() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleFiles = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT_FILES) setFileLimit(true);
        if (uploaded.length > MAX_COUNT_FILES) {
          alert(`You can only add a maximum of ${MAX_COUNT_FILES} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) {
      setUploadedFiles(uploaded);
    }
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("uploaded_files", file, file.name);
    });

    const requestOptions = {
      method: "POST",
      credentials: "include",
      body: formData,
    };

    fetch("http://localhost:8000/api/files", requestOptions)
      .then((response) => response.json())
      .catch((e) => console.log(`e: ${e}`));
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const chosenFiles = Array.prototype.slice.call(e.dataTransfer.files);
      handleUploadFiles(chosenFiles);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="dd">
      <form
        className="dd__upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpeg, .png, .png, .pdf"
          className="dd__input"
          multiple={true}
          onChange={handleFiles}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          {uploadedFiles.length === 0 ? (
            <div>
              <div className="dd_text">Drag and drop your file here or</div>
              <button className="dd__uploadBtn" onClick={onButtonClick}>
                upload a file
              </button>
            </div>
          ) : (
            <div style={{ overflowY: "scroll" }} className="dd_scrollable">
              <ol>
                {uploadedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ol>
            </div>
          )}
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <button
          id=""
          className={`btn-upload-files ${!fileLimit ? "" : "disabled"} `}
          onClick={handleSubmit}
        >
          Upload files
        </button>
        {/* <ol>
          {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ol> */}
      </form>
    </div>
  );
}
