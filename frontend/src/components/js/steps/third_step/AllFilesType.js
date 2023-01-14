import React, { useContext } from "react";
import "../../../css/steps/third_step/AllFilesType.css";
import { ConfigContext } from "../../../../ConfigContext";

export default function AllFilesType({ handleClick, handleFlag }) {
  const { config, setConfig } = useContext(ConfigContext);
  let filetypes = ["jpg", "pdf", "txt", "png"];

  const handleClickConfig = (filetype) => {
    let filetypeConfig =
      filetype === "jpg"
        ? "image/jpeg"
        : filetype === "png"
        ? "image/png"
        : filetype === "txt"
        ? "text/plain"
        : filetype === "pdf"
        ? "application/pdf"
        : "Unknown";

    setConfig((prevConfig) => {
      return {
        ...prevConfig,
        file_configs: prevConfig.file_configs.map((file) => {
          return {
            ...file,
            result_type: filetypeConfig,
          };
        }),
      };
    });
    handleClick(filetypeConfig);
    handleFlag();
  };

  return (
    <div className="all-files-type">
      <div className="all-files-type__title">
        Choose your final filetype for all files:
      </div>
      <div className="file-type-grid">
        {filetypes.map((filetype) => (
          <div
            key={filetype}
            className={`file-type-tile`}
            value={filetype}
            onClick={() => handleClickConfig(filetype)}
          >
            <div className="file-type-extension">{filetype}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
