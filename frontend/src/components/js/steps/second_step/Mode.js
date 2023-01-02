import React from "react";
import "../../../css/steps/second_step/Mode.css";

export default function Mode() {
  const [selectedMode, setSelectedMode] = React.useState(null);

  const handleSelect = (event) => {
    setSelectedMode(event.target.value);
  };

  return (
    <div className="col mode__one-mode">
      <div className="row mode__title justify-content-center">
        Select one mode:
      </div>
      <div className="row justify-content-center">
        <div
          className={`mode__select-mode ${
            selectedMode === "model" ? "selected" : ""
          }`}
          onClick={() => setSelectedMode("model")}
        >
          <input
            type="radio"
            name="model"
            id="model"
            value="model"
            checked={selectedMode === "model"}
            onChange={handleSelect}
          />
          <div className="mode__extension">faster</div>
        </div>
        <div
          className={`mode__select-mode ${
            selectedMode === "regex" ? "selected" : ""
          }`}
          onClick={() => setSelectedMode("regex")}
        >
          <input
            type="radio"
            name="model"
            id="regex"
            value="regex"
            checked={selectedMode === "regex"}
            onChange={handleSelect}
          />
          <div className="mode__extension">more accurate</div>
        </div>
      </div>
    </div>
  );
}
