import React, { useState } from "react";
import "../../../css/steps/second_step/Phrases.css";

export default function Phrases() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div class="phrases">
      <div class="">
        <div class="phrases__title">
          Enter the exact phrases you want to anonymise:
        </div>
        <div className="d-flex justify-content-center">
          <textarea
            class="phrases__textarea"
            aria-label=""
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
