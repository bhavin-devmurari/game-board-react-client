import React from "react";

const Button = ({ classes, btnClick, children }) => {
  return (
    <button className={classes} onClick={btnClick}>
      {children}
    </button>
  );
};

export default Button;
