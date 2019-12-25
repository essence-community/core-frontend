import "core-js/features/array/find";
import "core-js/features/array/find-index";
import "core-js/features/symbol";
import "core-js/features/symbol/iterator";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./register";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
