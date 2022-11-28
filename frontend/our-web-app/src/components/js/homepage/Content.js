import React from "react";
import "../../css/homepage/Content.css";
import DragDropFile from "../DragDropFile";
import DownloadFile from "../DownloadFile";
import Invite from "./Invite";


export default function Navbar() {
  return (
    <div className="content">
      <Invite />
      <DownloadFile />
      <DragDropFile />
    </div>
  );
}
