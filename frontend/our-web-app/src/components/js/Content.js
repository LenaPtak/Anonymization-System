import React from "react";
import "../css/Content.css";
import DragDropFile from "./DragDropFile";
import DownloadFile from "./DownloadFile";

export default function Navbar() {
  return (
    <div>
      <DownloadFile />
      <DragDropFile />
    </div>
  );
}
