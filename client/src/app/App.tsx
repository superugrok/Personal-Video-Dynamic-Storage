import React from "react";
import { Header } from "@Components/Header";
import { Body } from "@Components/Body";
import "@Styles/reset.css";
import "@Styles/app.css";

export const App = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};
