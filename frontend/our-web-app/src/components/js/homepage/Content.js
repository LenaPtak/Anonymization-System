import React from "react";
import "../../css/homepage/Content.css";
import DragDropFile from "../DragDropFile";
import DownloadFile from "../DownloadFile";
import Invite from "./Invite";
import Possibilities from "./Possibilities";



export default function Navbar() {
  return (
    <div className="content">
      <Invite />
      <Possibilities />
      <DownloadFile />
      <DragDropFile />
    </div>
  );
}
