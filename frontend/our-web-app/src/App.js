import React from "react";
import DragDropFile from "./components/js/DragDropFile";

function App() {
  return (
    <div className="page">
      <div className="header">
        <h1>DOCUMENTS ANONYMISATION</h1>
        <h5>Upload the files where you want to wipe sensitive data</h5>
        <DragDropFile />
      </div>
    </div>
  );
}

export default App;