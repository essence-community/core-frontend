import "core-js/features/array/find";
import "core-js/features/array/find-index";
import "core-js/features/symbol";
import "core-js/features/symbol/iterator";
import React from "react";
import { createRoot } from 'react-dom/client';
import "mobx-react/batchingForReactDom";
import "./index.css";
import {saveSystemComponents} from "@essence-community/constructor-share/components";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import "./register";

saveSystemComponents();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
// serviceWorker.unregister();
