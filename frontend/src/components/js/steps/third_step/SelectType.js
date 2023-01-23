import React, { useState } from "react";
import "../../../css/steps/third_step/SelectType.css";

export default function SelectType(props) {
  const [flag, setFlag] = useState(props.flag);
  let filetypes = ["pdf", "jpg", "png", "txt"];

  function handleClick() {
    if (!flag) {
      setFlag(true);
    }
  }

  function handleSelectChange(event) {
    const selectedValue = event.target.value;
    props.onSelectChange(selectedValue, props.file);
  }

  let filetypeWeb =
    props.result_type === "image/jpeg"
      ? "jpg"
      : props.result_type === "image/png"
      ? "png"
      : props.result_type === "text/plain"
      ? "txt"
      : props.result_type === "application/pdf"
      ? "pdf"
      : props.result_type;

  return (
    <select
      className="form-select select"
      defaultValue={filetypeWeb}
      onClick={handleClick}
      onChange={handleSelectChange}
    >
      {/* {filetypes.map((filetype) => ( */}
        <option
          key={filetypeWeb}
          // value={filetype}
          // selected={filetype === filetypeWeb}
        >
          { filetypeWeb }
          {/* {flag ? filetype : filetypeWeb} */}
        </option>
      {/* ))} */}
    </select>
  );
}
