import React from "react";
import "@Styles/body.css";
import "@Styles/common.css";
import { Context } from "./Context";

export const BodyHead = () => {
  const [context, setContext] = React.useContext(Context);
  return (
    <div className="body_head">
      <h4 className="body_hover">Library</h4>
      <input
        onChange={(event) => setContext(event.target.value)}
        type="text"
        className="body_search"
        placeholder="Search Item..."
      />
      <button className="button button_violet">Upload</button>
    </div>
  );
};
