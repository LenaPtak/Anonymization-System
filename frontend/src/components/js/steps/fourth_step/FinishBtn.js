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
        // console.log("Sesja: ", data);
      })
      .catch((error) => {
        // this callback function is executed when the promise is rejected
        console.error(error);
      });
  }

  function downloadFile() {
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
  }

  function deleteSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        // this callback function is executed when the promise is fulfilled
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          return {
            tip: "You have no permission to delete session, probably was already deleted or not yet created. Check your cookies.",
          };
        } else {
          throw new Error(
            "Communication between React and FastAPI is not working. Something went wrong."
          );
        }
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect( () => {
    readSession();
  }, [])

  
  const handleSubmit = () => {
    downloadFile();
  };

  return (
    <button className="step__btn" onClick={handleSubmit}>
      Finish!
    </button>
  );
}