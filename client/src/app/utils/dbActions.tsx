import axios from "axios";

const path = "http://localhost:8080/";

export const selectAll = async () => {
  let items;
  await axios
    .post(`${path}selectAll`)
    .then((data) => {
      items = data;
    })
    .catch((e) => {
      console.error(e);
      window.alert("Select all procedure - QUERY ERROR!");
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
  }).catch((e) => {
    console.error(e);
    window.alert("Create procedure - QUERY ERROR!");
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
  }).catch((e) => {
    console.error(e);
    window.alert("Delete procedure - QUERY ERROR!");
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
  }).catch((e) => {
    console.error(e);
    window.alert("Edit procedure - QUERY ERROR!");
  });
};
