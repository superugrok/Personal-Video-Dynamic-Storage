import React from "react";
import "@Styles/body.css";
import { IItem } from "@Types/BodyContent";
import { Loading } from "@Components/common/Loading";
import { Context } from "./Context";

// Temporary objects array
const objects: IItem[] = [
  {
    type: "Youtube",
    url: "link",
    name: "Test",
    owner: "Erwin",
  },
  {
    type: "Link",
    url: "link",
    name: "Test2",
    owner: "Erwin",
  },
  {
    type: "Youtube",
    url: "link",
    name: "Test3",
    owner: "Erwin",
  },
  {
    type: "Link",
    url: "link",
    name: "Test4",
    owner: "Erwin",
  },
];

export const BodyContent = () => {
  const [items, setItems] = React.useState<JSX.Element[] | null>(null);
  const [displayedItems, setDisplayedItems] = React.useState<any>(null);
  const [search, setSearch] = React.useContext(Context);

  const bulkRequest: Promise<IItem[]> = new Promise((resolve) => {
    setTimeout(() => resolve(objects), 2000);
  });

  const getItems = async () => {
    await bulkRequest.then((data) => {
      const elements = data.map((itemData, i) => (
        <div
          className="content_item"
          key={i}
          onClick={() => window.open(itemData.url)}
        >
          <div className="content_item_top"></div>
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
      setItems(elements);
    });
  };

  React.useEffect(() => {
    getItems();
  }, []);

  React.useEffect(() => {
    if (items) {
      console.log(items[0]);
      const filteredItems = items.filter((item) =>
        item.props.children[1].props.children[0].props.children
          .toLowerCase()
          .match(search.toLowerCase())
      );
      setDisplayedItems(filteredItems);
    }
  }, [search]);

  return (
    <div className="body_content">{displayedItems || items || <Loading />}</div>
  );
};
