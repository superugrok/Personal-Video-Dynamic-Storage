import React from "react";
import "@Styles/body.css";
import { BodyHead } from "./bodyComponents/BodyHead";
import { BodyContent } from "./bodyComponents/BodyContent";
import { Context } from "./bodyComponents/Context";

export const Body = () => {
  // A search value
  const [search, setSearch] = React.useState<string | null>(null);
  return (
    <div className="body_container">
      <Context.Provider value={[search, setSearch]}>
        <BodyHead />
        <BodyContent />
      </Context.Provider>
    </div>
  );
};
