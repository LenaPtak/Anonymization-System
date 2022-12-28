import React from "react";
import SelectType from "./SelectType";
import "../../../css/steps/third_step/Scrollable.css";

export default function Scrollable() {
  const data = [
    { name: "faktura" },
    { name: "dokument" },
    { name: "analiza_roku" },
    { name: "filename1" },
    { name: "filename2" },
    { name: "filename3" },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
          <div className="scrollable__item">
            <div className="scrollable__file">{item.name}</div>
            <SelectType />
          </div>
        ))}
      </div>
    </div>
  );
}
