import React from "react";
import Description from "../fourth_step/Description";
import Result from "./Result";

export default function SelectResult() {
  return (
    <div>
      <div className="row">
        <div className="col">
          <Result />
        </div>
        <div className="col">
          <Description />
        </div>
      </div>
    </div>
  );
}
