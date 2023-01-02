import React from "react";
import Description from "./Description";
import Result from "./Result";

export default function SelectResult() {
  return (
    <div class="row">
      <div class="col">
        <Description />
      </div>
      <div class="col">
        <Result />
      </div>
    </div>
  );
}
