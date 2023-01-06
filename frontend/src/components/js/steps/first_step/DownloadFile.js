import React, { useState } from "react";
import "../../../css/steps/first_step/DownloadFile.css";

export default function DownloadFile() {
  const [files, setFiles] = useState([]);

  function readSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        // this callback function is executed when the promise is fulfilled
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          return {
            tip: "You have no permission to read session, probably cookie was deleted or not yet set.",
          };
        } else {
          throw new Error(
            "Communication between React and FastAPI is not working. Something went wrong."
          );
        }
      })
      .then((data) => {
        setFiles(data.files);
        // console.log(data)
      })
      .catch((error) => {
        // this callback function is executed when the promise is rejected
        console.error(error);
      });
  }

  const downloadFile = () => {
    files.forEach((file) => {
      fetch("http://localhost:8000/api/file/" + file.unique_name, {
        method: "GET",
        credentials: "include",
      })
        .catch((e) => console.log(`e: ${e}`))
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");

          link.href = url;
          link.setAttribute("download", file.origin_name);

          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    });
  };

  return (
    <div className="download-file">
      <button onClick={readSession}>Read Session</button>
      <button
        className="download-file__btn"
        label="Download"
        onClick={downloadFile}
      >
        Download files
      </button>
    </div>
  );
}
