import React from "react";
import "../../../css/steps/SelectResult.css";

export default function SelectResult() {
  return (
    <div className="row g-3">
      <div className="col decription">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a software like Aldus PageMaker type specimen book.
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <div class="col result">
        <label class="form-label">
          Choose in what form you want to receive your files:
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="merge" />
            <label class="form-check-label" for="merge">
              Merge files
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="split" />
            <label class="form-check-label" for="split">
              Split files
            </label>
          </div>
        </label>
      </div>
    </div>
  );
}
