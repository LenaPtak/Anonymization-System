import React from "react";
import SelectType from "./SelectType";
import "../../../css/steps/third_step/Scrollable.css";

export default function Scrollable() {
  const data = [
    { name: "faktura", klucz: "0" },
    { name: "dokument", klucz: "1" },
    { name: "analiza_roku", klucz: "2" },
    { name: "filename1", klucz: "3" },
    { name: "filename2", klucz: "4" },
    { name: "filename3", klucz: "5" },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="scrollable">
      <form className="scrollable__form">
        <input
          type="search"
          placeholder="Search..."
          className="scrollable__search"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
      <div
        style={{ overflowY: "scroll", height: "200px" }}
        className="scrollable__scrollbar"
      >
        {filteredData.map((item) => (
          <div className="scrollable__item" key={item.name}>
            <div className="scrollable__file" >{item.name}</div>
            <SelectType />
          </div>
        ))}
      </div>
    </div>
  );
}
