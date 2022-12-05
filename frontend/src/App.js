import React from "react"
import Header from "./components/js/homepage/Header"
import Footer from "./components/js/homepage/Footer"
import Content from "./components/js/homepage/Content"
import Step from "./components/js/steps/Step";
import SecondStep from "./components/js/steps/SecondStep";

import "./App.css";


function App() {
  return (
    <div className="page">
      <Header />
      <Content />
      <Step />
      <SecondStep />
      <Footer />
     </div>
    )
}

export default App;