import React, { useContext } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/second_step/Categories.css";

export default function Categories() {
  const { config, setConfig } = useContext(ConfigContext);

  let categories = ["names", "addresses", "phone numbers", "pesel", "date"];

  const handleConfig = (event) => {
    const category = event.target.value;
    setConfig((prevConfig) => {
      const regex_categories = prevConfig.regex_categories.includes(category)
        ? prevConfig.regex_categories.filter((c) => c !== category)
        : [...new Set([...prevConfig.regex_categories, category])];
      return {
        ...prevConfig,
        regex_categories,
      };
    });
  };

  const handleFaces = (event) => {
    setConfig((prevConfig) => {
      return {
        ...prevConfig,
        hide_people: event.target.checked,
      };
    });
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories justify-content-center">
      <div className="categories__title">Select category to anonymize:</div>
      <div className="categories__background">
        <div className="categories__form">
          <input
            type="search"
            placeholder="Search..."
            className="categories__search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div
          style={{ overflowY: "scroll", height: "200px" }}
          className="categories__scrollbar"
        >
          <div className="categories__item" key="human faces">
            <div className="categories__category">human faces</div>
            <input
              className="categories__checkbox"
              type="checkbox"
              value="human faces"
              id="human faces"
              onChange={handleFaces}
              checked={config.hide_people}
            />
          </div>
          {filteredCategories.map((category) => (
            <div className="categories__item" key={category}>
              <div className="categories__category">{category}</div>
              <input
                className="categories__checkbox"
                type="checkbox"
                value={category}
                id={category}
                onChange={handleConfig}
                checked={config.regex_categories.includes(category)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
