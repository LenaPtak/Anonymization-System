import React from "react";
import "../../css/homepage/Invite.css";

export default function Invite() {
  return (
    <div className="invite d-flex justify-content-center">
      <div className="invite__text">
        <h1 className="invite__tittle">WE MAKE ANONYMIZATION SIMPLE.</h1>
        <h5 className="invite__under-tittle">Thanks to our tools Your data can be safe.</h5>
        <button className="invite__btn">Let's anonymize some documents</button>
      </div>
      <img className="invite__photo" src="..\images\homepage1.svg" alt="" />
    </div>
  );
}
