import React, { useContext } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/fourth_step/Result.css";

export default function Result() {
  const { config, setConfig } = useContext(ConfigContext);
  const forms = ["default", "merge", "split"];

  const handleClick = (form) => {
    setConfig((prevConfig) => {
      return {
        ...prevConfig,
        result_form: form,
      };
    });
  };

  return (
    <div className="result">
      <div className="result__title">
        Choose in what form you want to receive your files:
      </div>
      {forms.map((form) => (
        <div
          key={form}
          className={`result__tile ${
            config.result_form === form ? "selected" : ""
          }`}
          onClick={() => handleClick(form)}
        >
          <div className="result__tile__extension">
            {form === "default"
              ? "Default option"
              : form === "merge"
              ? "Merge files"
              : "Split pages"}
          </div>
        </div>
      ))}
    </div>
  );
}
