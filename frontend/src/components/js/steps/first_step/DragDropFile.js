import React, { useState } from "react";
import "../../../css/steps/first_step/DragDropFile.css";

const MAX_COUNT_FILES = 10;

export default function DragDropFile(props) {
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
      props.updateUploadedFiles(uploaded);
    }
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

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles(
      uploadedFiles.filter((file) => file.name !== fileToRemove.name)
    );
    props.updateUploadedFiles(
      uploadedFiles.filter((file) => file.name !== fileToRemove.name)
    );
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
          accept=".jpeg, .png, .png, .pdf, .txt"
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
              {/* <div className="dd_text">Drag and drop your file here or</div> */}
              <button className="dd__uploadBtn" onClick={onButtonClick}>
                upload more files
              </button>
              <div className="dd__fileList">
                <div>
                  {uploadedFiles.map((file) => (
                    <ol key={file.name}>
                      <button
                        onClick={() => handleRemoveFile(file)}
                        className="dd_deleteBtn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      {file.name}
                    </ol>
                  ))}
                </div>
              </div>
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
      </form>
    </div>
  );
}
