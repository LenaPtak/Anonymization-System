import React, { useContext } from "react";
import "../../../css/steps/third_step/AllFilesType.css";
import { ConfigContext } from "../../../../ConfigContext";

export default function AllFilesType() {
  const { config, setConfig } = useContext(ConfigContext);
  let filetypes = ["jpg", "pdf", "txt", "png"];

  const handleClick = (filetype) => {
    console.log(config.file_configs);
    setConfig((prevConfig) => {
      return {
        ...prevConfig,
        file_configs: prevConfig.file_configs.map((file) => {
          return {
            ...file,
            result_type: filetype,
          };
        }),
      };
    });
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
            onClick={() => handleClick(filetype)}
          >
            <div className="file-type-extension">{filetype}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
