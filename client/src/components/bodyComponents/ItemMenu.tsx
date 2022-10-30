import { editItem, removeItem, selectAll } from "@App/utils/dbActions";
import { IItem } from "@Types/BodyContent";
import React from "react";
import { Context } from "./Context";

export interface IItemMenu {
  itemData: IItem;
}

export const ItemMenu = ({ itemData }: IItemMenu) => {
  const [context, setContext] = React.useContext(Context);

  // Save item function
  const saveItem = (newName: string) => {
    if (newName) {
      editItem(itemData._id, newName)
        .then(() => selectAll())
        .then((data) => {
          setContext({
            ...context,
            newData: data,
          });
        });
    } else alert("You have to fill all possible inputs!");
  };

  const deleteItem = () => {
    let confirm = window.confirm(
      `Are you sure that you want to delete ${itemData.name}?`
    );
    confirm &&
      removeItem(itemData._id).then(() =>
        selectAll().then((data) =>
          setContext({
            ...context,
            newData: data,
          })
        )
      );
  };

  const renameItem = () => {
    const newName = window.prompt("Enter new name for this item");
    newName && newName.length < 20 && saveItem(newName);
  };

  const copyItem = () => {
    navigator.clipboard.writeText(itemData.url);
    window.alert("Link is copied into your clipboard");
  };

  return (
    <div className="content_top_menu">
      <div
        title="Delete item"
        onClick={() => deleteItem()}
        className="content_top_menu_item content_top_menu_delete"
      ></div>
      <div
        title="Edit item's name"
        onClick={() => renameItem()}
        className="content_top_menu_item content_top_menu_edit"
      ></div>
      <div
        title="Copy item's link"
        onClick={() => copyItem()}
        className="content_top_menu_item content_top_menu_copy"
      ></div>
    </div>
  );
};
