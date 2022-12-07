import React from "react";
import "../../css/homepage/Content.css";
import Invite from "./Invite";
import Possibilities from "./Possibilities";
import SelectCategory from "./SelectCategory";
import Converting from "./Converting";
import Merge from "./Merge";

export default function Content() {
  return (
    <div className="content">
      <Invite />
      <Possibilities />
      <SelectCategory />
      <Converting />
      <Merge />
    </div>
  );
}
