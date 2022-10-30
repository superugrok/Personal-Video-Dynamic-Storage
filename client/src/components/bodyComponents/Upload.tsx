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

  // An teoretical user
  const userName = "Erwin";

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
    const urlValue = urlRef.current.value;
    const nameValue = nameRef.current.value;
    if (
      nameValue.length > 2 &&
      nameValue.length < 20 &&
      urlPattern.test(urlValue)
    ) {
      const itemType = urlValue.toLowerCase().match("youtube.com")
        ? "Youtube"
        : "Link";
      addItem(nameValue, urlValue, userName, itemType)
        .then(() => selectAll())
        .then((data) => {
          setContext({ ...context, upload: false, newData: data });
        });
    } else alert("You have to make sure that you enter a valid data!");
  };

  // Handle enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveItem();
    }
  };

  // Inputs validate funcs
  const validateInput = (type: string) => {
    switch (type) {
      case "url":
        {
          const inputStyle = urlRef.current.style;
          const inputValue = urlRef.current.value;
          !urlPattern.test(inputValue)
            ? (inputStyle.borderColor = "red")
            : (inputStyle.borderColor = "green");
        }
        break;
      case "name":
        {
          const inputStyle = nameRef.current.style;
          const inputValue = nameRef.current.value;
          inputValue.length < 2 || inputValue.length > 20
            ? (inputStyle.borderColor = "red")
            : (inputStyle.borderColor = "green");
        }
        break;
    }
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
          onChange={() => validateInput("url")}
          onKeyDown={(event) => handleKeyDown(event)}
          type="text"
          placeholder="e.g. docs.google.com/presentation"
          inputRef={urlRef}
          maxLength={200}
        />
        <p className="modal_p">Name</p>
        <Input
          onChange={() => validateInput("name")}
          onKeyDown={(event) => handleKeyDown(event)}
          type="text"
          placeholder="e.g. AMCE demo"
          inputRef={nameRef}
          maxLength={20}
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
