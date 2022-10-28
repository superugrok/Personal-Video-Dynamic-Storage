import React from "react";
import { Context } from "./Context";
import "@Styles/upload.css";
import "@Styles/body.css";
import "@Styles/common.css";
import { addItem, selectAll } from "@App/utils/dbActions";

export const Upload = () => {
  const [context, setContext] = React.useContext(Context);
  const modalRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const urlRef = React.useRef(null);

  // Close modal when clicking outside of window.
  window.onclick = (event) => {
    if (event.target == modalRef.current) {
      setContext({ ...context, upload: false });
    }
  };

  // URL Regexp pattern
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator

  // Save item function
  const saveItem = () => {
    if (nameRef.current.value && urlPattern.test(urlRef.current.value)) {
      nameRef.current.style.borderColor = "#a9b5db";
      urlRef.current.style.borderColor = "#a9b5db";
      addItem(nameRef.current.value, urlRef.current.value, "Erwin", "Youtube")
        .then(() => selectAll())
        .then((data) => {
          setContext({ ...context, upload: false, newData: data });
        });
    } else if (!urlPattern.test(urlRef.current.value))
      urlRef.current.style.borderColor = "red";
    else if (!nameRef.current.value) nameRef.current.style.borderColor = "red";
    else alert("You have to fill all possible inputs!");
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
          <input
            type="text"
            placeholder="e.g. docs.google.com/presentation"
            ref={urlRef}
          />
          <p className="modal_p">Name</p>
          <input type="text" placeholder="e.g AMCE demo deck" ref={nameRef} />
          <div className="modal_buttons_area">
            <button
              onClick={() => setContext({ ...context, upload: false })}
              className="button button_grey button_back"
            >
              {"<"} Back
            </button>
            <button
              onClick={() => saveItem()}
              className="button button_violet button_next"
            >
              Save {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
