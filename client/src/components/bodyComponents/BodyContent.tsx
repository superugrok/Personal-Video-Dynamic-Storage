import React from "react";
import "@Styles/body.css";
import { IItem } from "@Types/BodyContent";
import { Loading } from "@Components/commonComponents/Loading";
import { Context } from "./Context";
import { selectAll } from "@App/utils/dbActions";

export const BodyContent = () => {
  const [items, setItems] = React.useState<JSX.Element[] | null>(null);
  const [filteredItems, setFilteredItems] = React.useState<
    JSX.Element[] | null
  >(null);
  const [context] = React.useContext(Context);

  // Get items at first render / data refresh
  React.useEffect(() => {
    getItems();
    // Reset search every data refresh
    filteredItems && setFilteredItems(null);
  }, [context.newData]);

  // Filter items at search case
  React.useEffect(() => {
    if (items) {
      const filteredItems = items.filter((item) =>
        item.props.children[0].props.children
          .toLowerCase()
          .match(context.search.toLowerCase())
      );
      setFilteredItems(filteredItems);
    }
  }, [context.search]);

  // Get items from DB and build components.
  const getItems = async () => {
    await selectAll().then((data: any) => {
      const items = data.data.map((itemData) => (
        <div
          className="content_item"
          key={itemData._id}
          onClick={() => window.open(itemData.url)}
        >
          <div style={{ display: "none" }}>{itemData.name}</div>
          <div className="content_item_top">
            <div className="content_top_menu">
              <div className="content_top_menu_delete">Delete</div>
              <div className="content_top_menu_copy">Copy</div>
            </div>
          </div>
          <div className="content_item_bot">
            <div className="body_head">
              <h4 className="content_item_desc">{itemData.name}</h4>
            </div>
            <div className="body_head">
              <p className="content_item_bot_line content_item_owner">
                {itemData.owner}
              </p>
              <p className="content_item_bot_line">{itemData.type}</p>
            </div>
          </div>
        </div>
      ));
      setItems(items);
    });
  };

  return (
    <div className="body_content">{filteredItems || items || <Loading />}</div>
  );
};