import React from "react";
import "@Styles/body.css";
import { BodyHead } from "./bodyComponents/BodyHead";
import { BodyContent } from "./bodyComponents/BodyContent";
import { Context } from "./bodyComponents/Context";
import { IContext } from "@Types/Body";
import { Upload } from "./bodyComponents/Upload";

export const Body = () => {
  // A context
  const [context, setContext] = React.useState<IContext | null>({
    search: null,
    upload: false,
    newData: null,
  });
  return (
    <div className="body_container">
      <Context.Provider value={[context, setContext]}>
        <BodyHead />
        <BodyContent />
        <Upload />
      </Context.Provider>
    </div>
  );
};
