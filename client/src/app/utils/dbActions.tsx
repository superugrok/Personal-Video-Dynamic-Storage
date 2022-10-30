import axios from "axios";

const path = "http://localhost:8080/";

export const selectAll = async () => {
  let items;
  await axios.post(`${path}selectAll`).then((data) => {
    items = data;
  });
  return items;
};

export const addItem = async (
  name: string,
  url: string,
  owner: string,
  type: string
) => {
  const action = "create";
  await axios({
    method: "post",
    url: path + action,
    params: {
      name,
      url,
      owner,
      type,
    },
  });
};

export const removeItem = async (_id: string) => {
  const action = "delete";
  await axios({
    method: "post",
    url: path + action,
    params: {
      _id,
    },
  });
};

export const editItem = async (_id: string, newName: string) => {
  const action = "edit";
  await axios({
    method: "post",
    url: path + action,
    params: {
      _id,
      newName,
    },
  });
};
