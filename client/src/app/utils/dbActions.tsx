import axios from "axios";

const path = "http://localhost:8080/";

export const selectAll = async () => {
  let items;
  await axios.post(`${path}selectAll`).then((data) => {
    items = data;
  });
  return items;
};

export const addItem = async (name, url, owner, type) => {
  await axios({
    method: "post",
    url: `${path}create`,
    params: {
      name,
      url,
      owner,
      type,
    },
  });
};

export const removeItem = async (_id) => {
  await axios({
    method: "post",
    url: `${path}delete`,
    params: {
      _id,
    },
  });
  await selectAll();
};
