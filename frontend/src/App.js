import React from "react";
import Homepage from "./components/js/homepage/Homepage";
import AboutUs from "./components/js/about_us/AboutUs";
import Contact from "./components/js/contact/Contact";
import OtherTools from "./components/js/other_tools/OtherTools";
import Step from "./components/js/steps/first_step/Step";
import SecondStep from "./components/js/steps/second_step/SecondStep";
import ThirdStep from "./components/js/steps/third_step/ThirdStep";
import FourthStep from "./components/js/steps/fourth_step/FourthStep";
import LoadingPage from "./components/js/steps/LoadingPage";
import TheEndPage from "./components/js/steps/TheEndPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}>
          {/* <Route path="*" element={<Error />} /> */}
        </Route>
        <Route path="home" element={<Homepage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="other" element={<OtherTools />} />
        <Route path="anonymization/send-files" element={<Step />} />
        <Route path="anonymization/select-category" element={<SecondStep />} />
        <Route path="anonymization/select-file-type" element={<ThirdStep />} />
        <Route
          path="anonymization/select-final-result"
          element={<FourthStep />}
        />
        <Route path="loading" element={<LoadingPage />} />
        <Route path="results" element={<TheEndPage />} />
      </Routes>
    </div>
  );
}

export default App;
