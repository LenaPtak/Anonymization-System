import React, { useState, useEffect, useContext } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/Step.css";

export default function FinishBtn() {
  const [files, setFiles] = useState([]);
  const { config, setConfig } = useContext(ConfigContext);

  function createConfig(config) {
    fetch("http://localhost:8000/api/config", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
          // console.log("Pobieram ", file.origin_name);
          if (count === files.length) {
            downloadRaport();
          }
        });
    });
  }

  function downloadRaport() {
    if (config.make_raport) {
      fetch("http://localhost:8000/api/raport", {
        method: "GET",
        credentials: "include",
      })
        .catch((e) => console.log(`e: ${e}`))
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");

          link.href = url;
          link.setAttribute("download", "raport.txt");

          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);

          setTimeout(() => {
            window.location.replace("/");
          }, 3000);

          // console.log("Pobieram raport");
        });
    } else {
      setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    }
  }

  useEffect(() => {
    readSession();
  }, []);

  const handleSubmit = () => {
    createConfig(config);
    downloadFile();
  };

  return (
    <button className="step__btn" onClick={handleSubmit}>
      Finish!
    </button>
  );
}
