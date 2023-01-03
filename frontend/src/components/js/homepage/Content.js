import React from "react";
import "../../css/homepage/Content.css";
import Invite from "./Invite";
import Possibilities from "./Possibilities";
import SelectCategory from "./SelectCategory";
import Converting from "./Converting";
import Merge from "./Merge";
import TemporarySessionHandlingButtons from "./TemporarySessionHandlingButtons";

export default function Content() {
  return (
    <div className="content">
      <TemporarySessionHandlingButtons />
      <Invite />
      <Possibilities />
      <SelectCategory />
      <Converting />
      <Merge />
    </div>
  );
}
