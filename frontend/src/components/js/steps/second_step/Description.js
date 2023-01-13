import React, { useContext } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/second_step/Description.css";

export default function Description() {
  const { config, setConfig } = useContext(ConfigContext);

  const handleConfig = (event) => {
    setConfig((prevConfig) => {
      const make_raport = event.target.checked;
      return {
        ...prevConfig,
        make_raport,
      };
    });
    console.log(config);
  };

  return (
    <div className="col categories-description">
      <div className="row categories-description__paragraph">
        You have the option to select from several
        <b>categories that you'd like to anonymize,</b> such as names,
        addresses, and phone numbers and others.
      </div>
      <div className="row categories-description__paragraph">
        We hope that this gives you the control and flexibility you need to
        protect your privacy online. Either way, we're here to make sure that
        the process is as smooth and easy as possible.
      </div>
      <div className="row categories-description__paragraph">
        Do you want an anonymization report?
        <input
          className="row categories-description__checkbox"
          type="checkbox"
          id="raport"
          onChange={handleConfig}
        />
      </div>
    </div>
  );
}
