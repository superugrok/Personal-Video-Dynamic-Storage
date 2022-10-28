import React from "react";
import { Context } from "./Context";
import "@Styles/upload.css";
import "@Styles/body.css";
import "@Styles/common.css";

export const Upload = () => {
  const [context, setContext] = React.useContext(Context);
  const modalRef = React.useRef(null);

  // Close modal when clicking outside of window.
  window.onclick = (event) => {
    if (event.target == modalRef.current) {
      setContext({ ...context, upload: false });
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal"
      style={{ display: context.upload ? "block" : "none" }}
    >
      <div className="modal-content">
        <span
          className="close"
          onClick={() => setContext({ ...context, upload: false })}
        >
          &times;
        </span>
        <div className="modal_inner_content">
          <h4 className="body_hover">Upload</h4>
          <p className="modal_p">URL</p>
          <input type="text" placeholder="URL" />
          <p className="modal_p">Name</p>
          <input type="text" placeholder="URL" />
          <div className="modal_buttons_area">
            <button
              onClick={() => setContext({ ...context, upload: false })}
              className="button button_grey button_back"
            >
              {"<"} Back
            </button>
            <button className="button button_violet button_next">
              Save {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
