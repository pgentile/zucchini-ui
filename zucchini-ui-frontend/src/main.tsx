import "core-js/stable";
import "regenerator-runtime/runtime";

import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";

import "./main.scss";

window.addEventListener("DOMContentLoaded", () => {
  const elementId = "content";
  const contentElement = document.getElementById(elementId);
  if (contentElement === null) {
    console.warn(`Can't render React application, the root element with ${elementId} ID has not been found`);
    return;
  }
  const root = createRoot(contentElement);
  root.render(<AppRouter />);
});
