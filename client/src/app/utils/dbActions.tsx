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

export const removeItem = async (_id: string) => {
  await axios({
    method: "post",
    url: `${path}delete`,
    params: {
      _id,
    },
  });
};

export const editItem = async (_id: string, newName: string) => {
  await axios({
    method: "post",
    url: `${path}edit`,
    params: {
      _id,
      newName,
    },
  });
};
