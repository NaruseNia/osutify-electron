import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export const ModalPortal = ({ children }: PropsWithChildren) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el as Element);
};
