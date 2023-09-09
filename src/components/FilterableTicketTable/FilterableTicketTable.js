import React, { useState } from "react";
import TicketTypeSelector from "../TicketTypeSelector/TicketTypeSelector";
import TicketTable from "../TicketTable/TicketTable";
import { OPTIONS } from "../../constants";

export default function FilterableTicketTable() {
  const [activeOption, setActiveOption] = useState(OPTIONS[0]);
  return (
    <div>
      {" "}
      <TicketTypeSelector
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      <TicketTable activeOption={activeOption} />
    </div>
  );
}
