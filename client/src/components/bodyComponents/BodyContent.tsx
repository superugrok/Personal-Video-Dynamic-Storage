import React from "react";
import "@Styles/body.css";
import { IItem } from "@Types/BodyContent";
import { Loading } from "@Components/commonComponents/Loading";
import { Context } from "./Context";
import { selectAll } from "@App/utils/dbActions";
import { ItemMenu } from "./ItemMenu";
import { Upload } from "./Upload";
import ReactPlayer from "react-player";
import { NoContent } from "@Components/commonComponents/NoContent";

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

  const buildItems = (data) => {
    const items = data.data.map((itemData: IItem) => (
      <div className="content_item" key={itemData._id}>
        <div style={{ display: "none" }}>{itemData.name}</div>
        <div className="content_item_top">
          <ItemMenu itemData={itemData} />
          <div className="content_item_preview">
            {itemData.type == "Youtube" ? (
              <ReactPlayer url={itemData.url} width={"100%"} height={"100%"} />
            ) : (
              <div className="content_item_link"></div>
            )}
          </div>
        </div>
        <div
          className="content_item_bot"
          onClick={() => {
            let url = itemData.url;
            let formedUrl =
              url.match("http") || url.match("www") ? url : `http://${url}`;
            window.open(formedUrl).focus();
          }}
        >
          <div className="body_head">
            <h4 className="content_item_desc" title={itemData.name}>
              {itemData.name.length > 10
                ? itemData.name.substring(0, 7) + "..."
                : itemData.name}
            </h4>
            <div className="content_item_avatar"></div>
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
  };

  // Get items from DB and build components.
  const getItems = async () => {
    context.newData
      ? buildItems(context.newData)
      : await selectAll().then((data) => {
          buildItems(data);
        });
  };

  // Get content - first check if there is some filters, if no - render all items. If item loaded and has no data - display NoContent, if no - there is loading stage.
  const getContent = () => {
    return filteredItems ? (
      filteredItems
    ) : items !== null && items[0] ? (
      items
    ) : items !== null ? (
      <NoContent />
    ) : (
      <Loading />
    );
  };

  return (
    <div className="body_content">
      {getContent()}
      <Upload />
    </div>
  );
};
