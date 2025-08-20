import { type ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = { children: ReactNode; containerId?: string };

export default function Portal({
  children,
  containerId = "portal",
}: PortalProps) {
  const container = () => {
    let el = document.getElementById(containerId);
    if (!el) {
      el = document.createElement("div");
      el.id = containerId;
      document.body.appendChild(el);
    }
    return el;
  };

  return createPortal(children, container());
}
