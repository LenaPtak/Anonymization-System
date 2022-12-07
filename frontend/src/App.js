import React from "react";
import Homepage from "./components/js/homepage/Homepage";
import AboutUs from "./components/js/about_us/AboutUs";
import Contact from "./components/js/contact/Contact";
import OtherTools from "./components/js/other_tools/OtherTools";
import Step from "./components/js/steps/Step";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        {/* <Route path="*" element={<Error />} /> */}
      </Route>
      <Route path="home" element={<Homepage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="other" element={<OtherTools />} />
      <Route path="anonymization" element={<Step />} />
    </Routes>
  );
}

export default App;
