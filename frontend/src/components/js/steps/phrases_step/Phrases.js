import React, { useContext } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/phrases_step/Phrases.css";

export default function Phrases(props) {
  const { config, setConfig } = useContext(ConfigContext);

  const handleChange = (event) => {
    const newText = event.target.value;
    if (props.type === "highlight") {
      setConfig((prevConfig) => {
        return {
          ...prevConfig,
          expressions_to_highlight: [newText],
        };
      });
    } else {
      setConfig((prevConfig) => {
        return {
          ...prevConfig,
          expressions_to_anonymize: [newText],
        };
      });
    }
  };

  return (
    <div className="row phrases">
      <div className="phrases__title">
        Enter the exact phrases you want to <b>{props.type}</b>:
      </div>
      <textarea
        className="phrases__textarea"
        aria-label=""
        onChange={handleChange}
      />
    </div>
  );
}
