import "core-js/stable";
import "regenerator-runtime/runtime";

import "./styles/main.less";

import ReactDOM from "react-dom";

import AppRouter from "./AppRouter";

ReactDOM.render(AppRouter(), document.getElementById("content"));
