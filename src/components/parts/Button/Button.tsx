import "./button.css";

import React from "react";

interface ButtonProps {
  action: Function,
  isDisabled?: boolean,
  type?: "button" | "submit" | "reset",
  text?:string,
  color?:string
}

const Button = ({
  action,
  isDisabled = false,
  type = "button",
  text = "Mon button",
  color = "btn-blue"
}: ButtonProps) => (
  <button
    className={`btn ${color}`}
    disabled={isDisabled}
    onClick={(evt) => !isDisabled && action(evt)}
    type={type}
  >
    {text}
  </button>
);

export default Button;
