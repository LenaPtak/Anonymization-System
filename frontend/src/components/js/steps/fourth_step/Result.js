import React from "react";
import "../../../css/steps/fourth_step/Result.css";

export default function Result() {
  const [selectedResult, setSelectedResult] = React.useState(null);

  const handleChange = (event) => {
    setSelectedResult(event.target.value);
  };

  return (
    <div className="result">
      <div className="result__title">
        Choose in what form you want to receive your files:
      </div>
      <div className="">
        <div
          className={`result__tile ${
            selectedResult === "merge" ? "selected" : ""
          }`}
          onClick={() => setSelectedResult("merge")}
        >
          <input
            type="radio"
            name="filetype"
            id="merge"
            value="merge"
            checked={selectedResult === "merge"}
            onChange={handleChange}
          />
          <div className="result__tile__extension">Merge files</div>
        </div>
        <div
          className={`result__tile ${
            selectedResult === "split" ? "selected" : ""
          }`}
          onClick={() => setSelectedResult("split")}
        >
          <input
            type="radio"
            name="filetype"
            id="split"
            value="split"
            checked={selectedResult === "split"}
            onChange={handleChange}
          />
          <div className="result__tile__extension">Split files</div>
        </div>
      </div>
    </div>
  );
}
