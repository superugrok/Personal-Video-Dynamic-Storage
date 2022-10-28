import React from "react";

export const Context = React.createContext<any>({
  search: null,
  upload: false,
  newData: null,
});
