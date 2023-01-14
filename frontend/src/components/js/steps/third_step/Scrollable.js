import React, { useEffect, useState, useContext } from "react";
import SelectType from "./SelectType";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/third_step/Scrollable.css";

export default function Scrollable({ selectedFileType, clickFlag }) {
  const { config, setConfig } = useContext(ConfigContext);
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

  const addFilesToConfig = (file) => {
    const existingFile = config.file_configs.find(
      (f) => f.unique_name === file.unique_name
    );
    if (!existingFile) {
      config.file_configs.push({
        origin_name: file.origin_name,
        origin_type: file.type,
        unique_name: file.unique_name,
        result_type: file.type,
      });
    }
  };

  useEffect(() => {
    readSession();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleSelectChange(selectedValue, file) {
    let filetypeConfig =
      selectedValue === "jpg"
        ? "image/jpeg"
        : selectedValue === "png"
        ? "image/png"
        : selectedValue === "txt"
        ? "text/plain"
        : selectedValue === "pdf"
        ? "application/pdf"
        : "Unknown";

    let found = false;
    for (let i = 0; i < config.file_configs.length; i++) {
      if (config.file_configs[i].unique_name === file.unique_name) {
        setConfig((prevConfig) => {
          return {
            ...prevConfig,
            file_configs: prevConfig.file_configs.map((f) => {
              if (f.unique_name === file.unique_name) {
                return {
                  ...f,
                  result_type: filetypeConfig,
                };
              }
              return f;
            }),
          };
        });
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Error - nie znaleziono pliku w config.file_configs.");
    }
  }

  const filteredFiles = files.filter((file) =>
    file.origin_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="scrollable">
      <div className="scrollable__title">Or for specific file:</div>
      <div className="scrollable__background">
        <form className="scrollable__form">
          <input
            type="search"
            placeholder="Search..."
            className="scrollable__search"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
        <div
          style={{ overflowY: "scroll", height: "200px" }}
          className="scrollable__scrollbar"
        >
          {filteredFiles.map((item) => {
            addFilesToConfig(item);
            let fileFound = config.file_configs.find(
              (file) => file.unique_name === item.unique_name
            );
            let result_type = "";
            if (fileFound) {
              result_type = fileFound.result_type;
            }
            return (
              <div className="scrollable__item" key={item.unique_name}>
                <div className="scrollable__file">{item.origin_name}</div>
                <SelectType
                  file={item}
                  result_type={result_type}
                  onSelectChange={handleSelectChange}
                  flag={clickFlag}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
