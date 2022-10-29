import React from "react";
import { Logo } from "./headerComponents/Logo";
import { Profile } from "./headerComponents/Profile";
import "@Styles/header.css";

export const Header = () => {
  return (
    <div className="header_container">
      <Logo />
      <Profile />
    </div>
  );
};
