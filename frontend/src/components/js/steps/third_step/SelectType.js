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

  return (
    <select
      className="form-select select"
      defaultValue={props.result_type}
      onClick={handleClick}
      onChange={handleSelectChange}
    >
      {filetypes.map((filetype) => (
        <option
          key={filetype}
          // value={filetype}
          selected={filetype === props.result_type}
        >
          {flag ? filetype : props.result_type}
        </option>
      ))}
    </select>
  );
}
