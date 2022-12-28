import React from "react";
import "../../../css/steps/third_step/SelectType.css";

export default function SelectType() {
  return (
    <select class="form-select select">
      <option selected value="pdf">
        .pdf
      </option>
      <option value="png">.png</option>
      <option value="jpg">.jpg</option>
      <option value="txt">.txt</option>
    </select>
  );
}
