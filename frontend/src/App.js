import React, { useState } from "react";
import Homepage from "./components/js/homepage/Homepage";
import AboutUs from "./components/js/about_us/AboutUs";
import Contact from "./components/js/contact/Contact";
import OtherTools from "./components/js/other_tools/OtherTools";
import Step from "./components/js/steps/first_step/Step";
import SecondStep from "./components/js/steps/second_step/SecondStep";
import ThirdStep from "./components/js/steps/third_step/ThirdStep";
import FourthStep from "./components/js/steps/fourth_step/FourthStep";
import PhrasesStep from "./components/js/steps/phrases_step/PhrasesStep";
import LoadingPage from "./components/js/steps/LoadingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ConfigContext } from "./ConfigContext";

function App() {
  const [config, setConfig] = useState({
    regex_categories: [],
    expressions_to_anonymize: [],
    expressions_to_highlight: [],
    hide_people: false,
    make_raport: false,
    result_form: "",
    file_configs: [
      {
        origin_name: "",
        unique_name: "",
        origin_type: "",
        result_type: "",
      },
    ],
  });

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <Routes>
        <Route path="/" element={<Homepage />}>
          {/* <Route path="*" element={<Error />} /> */}
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="other" element={<OtherTools />} />
        <Route path="anonymization/send-files" element={<Step />} />
        <Route path="anonymization/select-category" element={<SecondStep />} />
        <Route path="anonymization/phrases" element={<PhrasesStep />} />
        <Route path="anonymization/select-file-type" element={<ThirdStep />} />
        <Route
          path="anonymization/select-final-result"
          element={<FourthStep />}
        />
        <Route path="loading" element={<LoadingPage />} />
      </Routes>
    </ConfigContext.Provider>
  );
}

export default App;
