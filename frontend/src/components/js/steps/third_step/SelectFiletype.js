import React from "react";
import "../../../css/steps/SelectFiletype.css";

export default function SelectFiletype() {
  return (
    <div className="row g-3">
      <div className="col search">
        <p>file.png</p>
        <p>file.png</p>
        <p>file.png</p>
        <p>file.png</p>
        <p>file.png</p>
        <p>file.png</p>
        <p>file.png</p>
        <p>file.png</p>
      </div>
      <div class="col all-files">
        <label class="form-label">
          Choose your final filetype for all files:
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="jpg" />
            <label class="form-check-label" for="jpg">
              .jpg
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="pdf" />
            <label class="form-check-label" for="pdf">
              .pdf
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="txt" />
            <label class="form-check-label" for="txt">
              .txt
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="png" />
            <label class="form-check-label" for="png">
              .png
            </label>
          </div>
        </label>
      </div>
    </div>
  );
}
