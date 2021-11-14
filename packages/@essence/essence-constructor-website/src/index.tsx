import "core-js/features/array/find";
import "core-js/features/array/find-index";
import "core-js/features/symbol";
import "core-js/features/symbol/iterator";
import React from "react";
import ReactDOM from "react-dom";
import "mobx-react/batchingForReactDom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import "./register";

ReactDOM.render(<App />, document.getElementById("root"));

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
// serviceWorker.unregister();
