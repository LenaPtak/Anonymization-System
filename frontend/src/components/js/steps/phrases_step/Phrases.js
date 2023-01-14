import React, { useContext } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/phrases_step/Phrases.css";

export default function Phrases(props) {
  const { config, setConfig } = useContext(ConfigContext);

  const handleChange = (event) => {
    const newText = event.target.value;
    const phrases = newText.split(",");
    phrases.map((phrase) => phrase.trim());
    if (props.type === "highlight") {
      setConfig((prevConfig) => {
        return {
          ...prevConfig,
          expressions_to_highlight: phrases,
        };
      });
    } else {
      setConfig((prevConfig) => {
        return {
          ...prevConfig,
          expressions_to_anonymize: phrases,
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
