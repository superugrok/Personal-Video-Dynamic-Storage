import React from "react";
import { IInput } from "@Types/Input";

export const Input = ({
  type,
  placeholder,
  maxLength,
  onChange,
  className,
  inputRef,
  onKeyDown,
}: IInput) => {
  return (
    <input
      onKeyDown={(event) => onKeyDown && onKeyDown(event)}
      ref={inputRef}
      type={type || "text"}
      placeholder={placeholder}
      maxLength={maxLength}
      className={className}
      onChange={(event) => onChange && onChange(event)}
    />
  );
};
