import React, { useState } from "react";
import "../../../css/steps/second_step/SelectCategory.css";

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
          <div className="paragraph">
            You have the option to select from several categories that you'd
            like to anonymize, such as names, addresses, and phone numbers.
          </div>
          <div className="paragraph">
            Additionally, you can input specific phrases that you'd like to hide
            from view.
          </div>
          <div className="paragraph">
            Furthermore, you can choose whether you'd like to anonymize quickly
            and less accurately, or more accurately but at a slower pace. This
            way, you can tailor the tool to your needs and preferences.
          </div>
          <div className="paragraph">
            We hope that this gives you the control and flexibility you need to
            protect your privacy online. Either way, we're here to make sure
            that the process is as smooth and easy as possible.
          </div>
        </div>
      </div>

      {/* <button type="submit" class="btn btn-primary" onSubmit={handleSubmit}>
        Save
      </button> */}
    </form>
  );
}
