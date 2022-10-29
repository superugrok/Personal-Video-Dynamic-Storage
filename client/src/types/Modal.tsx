import { IContext } from "@Types/Body";
import { ReactElement } from "react";

export interface IModal {
  modalType: string;
  display: boolean;
  context: {
    setContext: (newContext: IContext) => void;
    context: IContext;
  };
  refs: {
    modalRef: React.MutableRefObject<any>;
    extraRefs?: { [key: string]: React.MutableRefObject<any> };
  };
  functions?: { [key: string]: () => any };
  children?: ReactElement;
}
