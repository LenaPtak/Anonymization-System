import React, { useState } from "react";
import "../../../css/steps/SelectCategory.css";

export default function SelectCategory() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="row g-3">
        <div class="col select">
          <div className="one-mode">
            <label class="form-label">
              Select one mode:
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Model
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Regex
                </label>
              </div>
            </label>
          </div>

          <div class="categories">
            <label class="form-label">
              Select categories you want to hide:
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="names" />
                <label class="form-check-label" for="names">
                  Names
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="phoneNumbers"
                />
                <label class="form-check-label" for="phoneNumbers">
                  Phone numbers
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="addresses"
                />
                <label class="form-check-label" for="addresses">
                  Addresses
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="socialSecurityNumbers"
                />
                <label class="form-check-label" for="socialSecurityNumbers">
                  Social security numbers
                </label>
              </div>
            </label>
          </div>
          <div class="phrases">
            <div class="input-group">
              <label class="form-label">
                Enter the exact phrases you want to anonymise:
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
          </div>
        </div>
        <div className="col description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>

      {/* <button type="submit" class="btn btn-primary" onSubmit={handleSubmit}>
        Save
      </button> */}
    </form>
  );
}
