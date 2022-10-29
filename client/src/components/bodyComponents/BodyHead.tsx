import React from "react";
import "@Styles/body.css";
import "@Styles/common.css";
import { Context } from "./Context";
import { Input } from "@Components/commonComponents/Input";
import { Button } from "@Components/commonComponents/Button";

export const BodyHead = () => {
  const [context, setContext] = React.useContext(Context);
  return (
    <div className="body_head">
      <h4 className="body_hover">Library</h4>
      <Input
        onChange={(event) =>
          setContext({ ...context, search: event.target.value })
        }
        type="text"
        className="body_search"
        placeholder="Search Item..."
      />
      <Button
        onClick={() => setContext({ ...context, upload: true })}
        className="button button_violet button_upload"
      >
        Upload
      </Button>
    </div>
  );
};
