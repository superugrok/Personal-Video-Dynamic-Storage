import React, { ReactElement } from "react";
import { IModal } from "@Types/Modal";

export const Modal = (props: IModal) => {
  return (
    <div
      ref={props.refs.modalRef}
      className="modal"
      style={{ display: props.context.context.upload ? "block" : "none" }}
    >
      <div className="modal-content">
        <span
          className="close"
          onClick={() =>
            props.context.setContext({
              ...props.context.context,
              upload: false,
            })
          }
        >
          &times;
        </span>
        <div className="modal_inner_content">{props.children}</div>
      </div>
    </div>
  );
};
