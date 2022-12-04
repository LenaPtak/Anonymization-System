import React, { useState } from "react";
import "../../css/steps/DragDropFile.css";
import DownloadFile from "./DownloadFile";

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
      formData.append("files", file, file.name);
    });

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch("http://127.0.0.1:9876/api/files", requestOptions).then((response) =>
      response.json()
    );
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
    <div className="drag-drop-file">
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpeg, .png, .png, .pdf"
          id="input-file-upload"
          multiple={true}
          onChange={handleFiles}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
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
          Submit files
        </button>
        <ol>
          {uploadedFiles.map((file) => (
            <li>{file.name}</li>
          ))}
        </ol>
        <DownloadFile uploadedFiles={uploadedFiles} />
      </form>
    </div>
  );
}
