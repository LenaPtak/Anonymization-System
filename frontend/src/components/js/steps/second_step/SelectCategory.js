import React from "react";
import "../../../css/steps/second_step/SelectCategory.css";
import Phrases from "./Phrases";
import Categories from "./Categories";
import Mode from "./Mode";
import Description from "./Description";

export default function SelectCategory() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col select-category__select">
          <Mode />
          <Categories />
          <Phrases />
        </div>
        <Description />
      </div>

      {/* <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
        Save
      </button> */}
    </form>
  );
}
