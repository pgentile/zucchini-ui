import "core-js/stable";
import "regenerator-runtime/runtime";

import { createRoot } from "react-dom/client";

import AppRouter from "./AppRouter";

import "./main.scss";

window.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");
  const root = createRoot(contentElement);
  root.render(<AppRouter />);
});
