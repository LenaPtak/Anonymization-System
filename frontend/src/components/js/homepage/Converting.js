import React from "react";
import "../../css/homepage/Invite.css";

export default function Converting() {
  return (
    <div className="invite d-flex justify-content-center">
      <div className="invite__text">
        <h1 className="invite__tittle">CONVERT YOUR FILES.</h1>
        <h5 className="invite__under-tittle">
          If you want, you can convert your files in .pdf .jpg .jpeg and .png
          formats in any direction.
        </h5>
        <button className="invite__btn">Let's anonymize some documents</button>
      </div>
      <img className="invite__photo" src="..\images\homepage3.svg" alt="" />
    </div>
  );
}