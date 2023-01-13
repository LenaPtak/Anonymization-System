import React from "react";
import Categories from "./Categories";
import Description from "./Description";

export default function SelectCategory() {
  return (
    <div>
      <div className="row g-3">
        <div className="col">
          <Categories />
        </div>
        <Description />
      </div>
    </div>
  );
}
