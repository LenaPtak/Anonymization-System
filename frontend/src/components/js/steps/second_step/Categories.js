import React from "react";
import "../../../css/steps/second_step/Categories.css";

export default function Categories() {
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const handleChange = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div class="select-category__categories justify-content-center">
      <div class="categories__title d-flex justify-content-center">
        Select categories you want to hide:
      </div>
      <div class="d-flex justify-content-center">
        <div
          className={`categories__select-mode ${
            selectedCategories.includes("names") ? "selected" : ""
          }`}
          onClick={() => handleChange({ target: { value: "names" } })}
        >
          <input
            type="checkbox"
            name="names"
            id="names"
            value="names"
            checked={selectedCategories.includes("names")}
            onChange={handleChange}
          />
          <div className="categories__extension">names</div>
        </div>
        <div
          className={`categories__select-mode ${
            selectedCategories.includes("addresses") ? "selected" : ""
          }`}
          onClick={() => handleChange({ target: { value: "addresses" } })}
        >
          <input
            type="checkbox"
            name="addresses"
            id="addresses"
            value="addresses"
            checked={selectedCategories.includes("addresses")}
            onChange={handleChange}
          />
          <div className="categories__extension">addresses</div>
        </div>
        <div
          className={`categories__select-mode ${
            selectedCategories.includes("phoneNumbers") ? "selected" : ""
          }`}
          onClick={() => handleChange({ target: { value: "phoneNumbers" } })}
        >
          <input
            type="checkbox"
            name="phoneNumbers"
            id="phoneNumbers"
            value="phoneNumbers"
            checked={selectedCategories.includes("phoneNumbers")}
            onChange={handleChange}
          />
          <div className="categories__extension">phone</div>
        </div>
        <div
          className={`categories__select-mode ${
            selectedCategories.includes("pesel") ? "selected" : ""
          }`}
          onClick={() => handleChange({ target: { value: "pesel" } })}
        >
          <input
            type="checkbox"
            name="pesel"
            id="pesel"
            value="pesel"
            checked={selectedCategories.includes("pesel")}
            onChange={handleChange}
          />
          <div className="categories__extension d-flex align-items-center">
            pesel
          </div>
        </div>
      </div>
    </div>
  );
}
