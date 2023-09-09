import React from "react";

export default function TicketRow({ ticket }) {
  const { icon, text } = ticket;
  // console.log(props, "props");
  return (
    <div className="flex space-x-2 items-center">
      {" "}
      <div> {icon} </div>
      <span>{text}</span>{" "}
    </div>
  );
}
