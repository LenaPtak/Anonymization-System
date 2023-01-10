import React, { useState, useEffect } from "react";
import "../../../css/steps/Step.css";

export default function FinishBtn() {
  const [files, setFiles] = useState([]);

  function readSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
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
        // console.log("Sesja: ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function downloadFile() {
    let count = 0;
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

          count++;
          console.log("Pobieram ", file.origin_name);
          if (count === files.length) {
            console.log("Pobieranie zakończone");
            setTimeout(() => {
              window.location.replace("/");
            }, 3000);
          }
        });
    });
  }

  useEffect(() => {
    readSession();
  }, []);

  const handleSubmit = () => {
    downloadFile();
  };

  return (
    <button className="step__btn" onClick={handleSubmit}>
      Finish!
    </button>
  );
}
