import React from "react";
import "../../../css/steps/second_step/SelectCategory.css";
import Description from "./Description";
import Phrases from "./Phrases";
import Categories from "./Categories";
import Mode from "./Mode";

export default function SelectCategory() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="row g-3">
        <div class="col select-category__select">
          <Mode />
          <Categories />
          <Phrases />
        </div>
        <Description />
      </div>

      {/* <button type="submit" class="btn btn-primary" onSubmit={handleSubmit}>
        Save
      </button> */}
    </form>
  );
}
