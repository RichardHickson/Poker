import React from "react";

interface Props {
  children: string;
  color?: "primary" | "danger";
  size?: string;
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary", size = "" }: Props) => {
  return (
    <button className={"btn btn-" + color + size} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
