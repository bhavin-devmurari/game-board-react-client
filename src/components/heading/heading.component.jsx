import React from "react";

const Heading = ({ children, addonClass }) => {
  return (
    <div className={`font-head heading ${addonClass ? addonClass : ""}`}>
      {children}
    </div>
  );
};
export default Heading;
