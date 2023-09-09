import React from "react";
import { OPTIONS } from "../../constants";

function TicketTypeSelector({ activeOption, setActiveOption }) {
  return (
    <div className="my-5 border rounded">
      <select
        className="w-44"
        onChange={(event) => {
          setActiveOption(event.target.value);
        }}
      >
        {OPTIONS.map((option) => (
          <option className="capitalize" value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TicketTypeSelector;
