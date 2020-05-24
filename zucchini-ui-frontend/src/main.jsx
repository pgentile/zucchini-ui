import "core-js/stable";
import "regenerator-runtime/runtime";
import "form-request-submit-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./AppRouter";

import "./main.scss";

ReactDOM.render(<AppRouter />, document.getElementById("content"));
