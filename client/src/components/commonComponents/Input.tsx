import React from "react";
import { IInput } from "@Types/Input";

export const Input = ({
  type,
  placeholder,
  maxLength,
  onChange,
  className,
  inputRef,
}: IInput) => {
  return (
    <input
      ref={inputRef}
      type={type || "text"}
      placeholder={placeholder}
      maxLength={maxLength}
      className={className}
      onChange={(event) => onChange && onChange(event)}
    />
  );
};