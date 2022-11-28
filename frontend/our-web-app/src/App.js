import React from "react"
import Header from "./components/js/homepage/Header"
import Footer from "./components/js/homepage/Footer"
import Content from "./components/js/homepage/Content"
import "./App.css";


function App() {
  return (
    <div className="page">
      <Header />
      <Content />
      <Footer />
     </div>
    )
}

export default App;