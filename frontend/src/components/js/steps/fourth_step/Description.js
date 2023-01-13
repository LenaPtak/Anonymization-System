import React from "react";
import "../../../css/steps/fourth_step/Description.css";

export default function Description() {
  return (
    <div className="fourth-description">
      <div className="fourth-description__paragraph">
        Great! In addition to the customization options mentioned earlier, our
        anonymization tool also allows you to download your anonymized files in
        a couple of different ways.
      </div>
      <div className="fourth-description__paragraph">
        By default, you have the option to download all of your files as they
        were sent, <b>each file individually</b>. This can be useful if you want
        to keep files organized in a specific way.
      </div>
      <div className="fourth-description__paragraph">
        Second option you have is to download all of your files as a{" "}
        <b>single, merged file</b>. This can be convenient if you want to keep
        everything in one place and avoid having to manage multiple files.
      </div>
      <div className="fourth-description__paragraph">
        On the other hand, if you prefer to keep all of your pages separate, you
        can also choose to download <b>each page individually</b>. This can be
        useful if you have big PDFs and want to manage or analyze the pages
        separately.
      </div>
      <div className="fourth-description__paragraph">
        Thanks for using our anonymization tool!
      </div>
    </div>
  );
}
