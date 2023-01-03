import React from "react";
import "../../../css/steps/third_step/SelectType.css";

export default function SelectType() {
  return (
    <select className="form-select select" defaultValue={"pdf"}>
      <option value="pdf">
        .pdf
      </option>
      <option value="png">.png</option>
      <option value="jpg">.jpg</option>
      <option value="txt">.txt</option>
    </select>
  );
}
