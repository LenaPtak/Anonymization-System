import React from "react"
import DragDropFile from "./components/js/DragDropFile"
import DownloadFile from "./components/js/DownloadFile"

function App() {
  return (
    <div className="page">
      <h1>React Drag & Drop</h1>
      <DragDropFile />
      <DownloadFile />
     </div>
    )
}

export default App;