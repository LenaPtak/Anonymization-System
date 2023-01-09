import React, { useEffect } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

export default function Homepage() {
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
  }, []);

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
