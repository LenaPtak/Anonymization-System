import React from "react";
import "../../css/homepage/StartBtn.css";

export default function StartBtn() {
  function createSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        // this callback function is executed when the promise is fulfilled
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          return {
            tip: "You have no permission to create session. That should not appear.",
          };
        } else {
          throw new Error(
            "Communication between React and FastAPI is not working. Something went wrong."
          );
        }
      })
      .then((data) => {
        // this callback function is executed when the promise is fulfilled
        console.log(data);
      })
      .catch((error) => {
        // this callback function is executed when the promise is rejected
        console.error(error);
      });
  }
  return (
    <button className="start__btn" onClick={createSession}>
      Let's anonymize some documents
    </button>
  );
}