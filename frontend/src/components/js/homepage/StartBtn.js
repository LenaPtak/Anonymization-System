import React from "react";
import "../../css/homepage/StartBtn.css";

export default function StartBtn() {
  function createSession() {
    fetch(`http://localhost:8000/api/session`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
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
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <button className="start__btn" onClick={createSession}>
      Let's anonymize some documents
    </button>
  );
}
