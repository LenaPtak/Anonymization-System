import React from "react";
import Description from "./Description";
import Phrases from "./Phrases";

export default function Content() {
  return (
    <div>
      <div className="col g-3">
        <Description />
        <div className="phrases__all">
          <Phrases type="highlight" />
          <Phrases type="anonymize" />
        </div>
      </div>
    </div>
  );
}
