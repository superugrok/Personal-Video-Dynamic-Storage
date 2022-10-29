import React from "react";
import { IButton } from "@Types/Button";

export const Button = ({ className, onClick, children }: IButton) => {
  return (
    <button
      className={`button ${className}`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};
