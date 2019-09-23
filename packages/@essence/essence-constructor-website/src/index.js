/* eslint-disable jsx-a11y/href-no-hash */
import "core-js/fn/array/find";
import "core-js/fn/array/find-index";
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./register";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
