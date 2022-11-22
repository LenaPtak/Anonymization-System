import React from "react"
import Navbar from "./components/js/Navbar"
import Footer from "./components/js/Footer"
import Content from "./components/js/Content"
import "./App.css";


function App() {
  return (
    <div className="page">
      <Navbar />
      <Content />
      <Footer />
     </div>
    )
}

export default App;