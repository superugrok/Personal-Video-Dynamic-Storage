import React from "react";
import { Context } from "./Context";
import "@Styles/modal.css";
import "@Styles/body.css";
import "@Styles/common.css";
import { addItem, selectAll } from "@App/utils/dbActions";
import { Modal } from "@Components/commonComponents/Modal";
import { IModal } from "@Types/Modal";
import { Input } from "@Components/commonComponents/Input";
import { Button } from "@Components/commonComponents/Button";

export const Upload = () => {
  const [context, setContext] = React.useContext(Context);
  const modalRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const urlRef = React.useRef(null);

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

  const modalProps: IModal = {
    modalType: "upload",
    display: context.upload,
    context: {
      context,
      setContext,
    },
    refs: {
      modalRef,
    },
  };

  return (
    <Modal {...modalProps}>
      <div>
        <p className="modal_p">URL</p>
        <Input
          type="text"
          placeholder="e.g. docs.google.com/presentation"
          inputRef={urlRef}
          maxLength={20}
        />
        <p className="modal_p">Name</p>
        <Input
          type="text"
          placeholder="e.g. AMCE demo"
          inputRef={nameRef}
          maxLength={11}
        />
        <div className="modal_buttons_area">
          <Button
            onClick={() => setContext({ ...context, upload: false })}
            className="button_grey button_back"
          >
            {"<"} Back
          </Button>
          <Button
            onClick={() => saveItem()}
            className="button_violet button_next"
          >
            Save {">"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
