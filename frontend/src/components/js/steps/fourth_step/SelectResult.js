import React from "react";
import "../../../css/steps/fourth_step/SelectResult.css";

export default function SelectResult() {
  return (
    <div className="row g-3">
      <div className="col result__decription">
        <div className="result__paragraph">
          Great! In addition to the customization options mentioned earlier, our
          anonymization tool also allows you to download your anonymized files
          in a couple of different ways.
        </div>
        <div className="result__paragraph">
          First, you have the option to download all of your files as a single,
          merged file. This can be convenient if you want to keep everything in
          one place and avoid having to manage multiple files.
        </div>
        <div className="result__paragraph">
          On the other hand, if you prefer to keep your files separate, you can
          also choose to download each file individually. This can be useful if
          you have a lot of files and want to keep them organized in a specific
          way.
        </div>
        <div className="result__paragraph">
          Thanks for using our anonymization tool!
        </div>
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
