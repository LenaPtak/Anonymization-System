import React from "react";
import "../../../css/steps/second_step/Description.css";

export default function Description() {
  return (
    <div className="col description">
      <div className="description__paragraph">
        You have the option to select from several categories that you'd like to
        anonymize, such as names, addresses, and phone numbers.
      </div>
      <div className="description__paragraph">
        Additionally, you can input specific phrases that you'd like to hide
        from view.
      </div>
      <div className="description__paragraph">
        Furthermore, you can choose whether you'd like to anonymize quickly and
        less accurately, or more accurately but at a slower pace. This way, you
        can tailor the tool to your needs and preferences.
      </div>
      <div className="description__paragraph">
        We hope that this gives you the control and flexibility you need to
        protect your privacy online. Either way, we're here to make sure that
        the process is as smooth and easy as possible.
      </div>
    </div>
  );
}
