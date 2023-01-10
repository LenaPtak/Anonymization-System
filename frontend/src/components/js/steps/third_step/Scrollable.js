import React, { useEffect, useState } from "react";
import SelectType from "./SelectType";
import "../../../css/steps/third_step/Scrollable.css";

export default function Scrollable() {
  const [files, setFiles] = useState([]);

  function readSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          return {
            tip: "You have no permission to read session, probably cookie was deleted or not yet set.",
          };
        } else {
          throw new Error(
            "Communication between React and FastAPI is not working. Something went wrong."
          );
        }
      })
      .then((data) => {
        setFiles(data.files);
        console.log("Sesja: ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    readSession();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.origin_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        {filteredFiles.map((item) => (
          <div className="scrollable__item" key={item.unique_name}>
            <div className="scrollable__file">{item.origin_name}</div>
            <SelectType />
          </div>
        ))}
      </div>
    </div>
  );
}
