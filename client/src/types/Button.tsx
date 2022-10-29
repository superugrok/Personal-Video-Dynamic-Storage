import { ReactNode } from "react";

export interface IButton {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}
