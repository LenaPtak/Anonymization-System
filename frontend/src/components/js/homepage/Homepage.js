import React, { useEffect, useContext } from "react";
import { ConfigContext } from "../../../ConfigContext";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

export default function Homepage() {
  const { config, setConfig } = useContext(ConfigContext);

  const resetConfig = () => {
    setConfig({
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
  };

  function deleteSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          return {
            tip: "You have no permission to delete session, probably was already deleted or not yet created. Check your cookies.",
          };
        } else {
          throw new Error(
            "Communication between React and FastAPI is not working. Something went wrong."
          );
        }
      })
      .then((data) => {
        // console.log("Sesja: ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    deleteSession();
    resetConfig();
  }, []);

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
