import React from "react";
import { IModal } from "@Types/Modal";

export const Modal = (props: IModal) => {
  // Close modal when clicking outside of window.
  window.onclick = (event) => {
    if (event.target == props.refs.modalRef.current) {
      props.context.setContext({
        ...props.context.context,
        [props.modalType]: false,
      });
    }
  };

  return (
    <div
      style={{ display: props.display ? "block" : "none" }}
      ref={props.refs.modalRef}
      className="modal"
    >
      <div className="modal-content">
        <span
          className="close"
          onClick={() =>
            props.context.setContext({
              ...props.context.context,
              [props.modalType]: false,
            })
          }
        >
          &times;
        </span>
        <div className="modal_inner_content">
          <h4 className="body_hover">Upload</h4>
          {props.children}
        </div>
      </div>
    </div>
  );
};
