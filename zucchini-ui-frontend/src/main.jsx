import "core-js/stable";
import "regenerator-runtime/runtime";

import ReactDOM from "react-dom";

import AppRouter from "./AppRouter";

import "./main.scss";

ReactDOM.render(<AppRouter />, document.getElementById("content"));
