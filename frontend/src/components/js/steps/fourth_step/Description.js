import React from "react";
import "../../../css/steps/fourth_step/Description.css";

export default function Description() {
  return (
    <div className="description">
      <div className="description__paragraph">
        Great! In addition to the customization options mentioned earlier, our
        anonymization tool also allows you to download your anonymized files in
        a couple of different ways.
      </div>
      <div className="description__paragraph">
        First, you have the option to download all of your files as a single,
        merged file. This can be convenient if you want to keep everything in
        one place and avoid having to manage multiple files.
      </div>
      <div className="description__paragraph">
        On the other hand, if you prefer to keep your files separate, you can
        also choose to download each file individually. This can be useful if
        you have a lot of files and want to keep them organized in a specific
        way.
      </div>
      <div className="description__paragraph">
        Thanks for using our anonymization tool!
      </div>
    </div>
  );
}
