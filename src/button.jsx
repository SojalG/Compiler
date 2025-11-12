import React from "react";

const Button = ({ buttonText, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};

export default Button;
