import * as React from "react";
import {render} from "react-dom";
import {PageModelAbstract} from "@essence-community/constructor-share/models/PageModel/PageModelAbstract";
import {
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import App from "./App";

const props = {
    bc: {
        [VAR_RECORD_OBJECT_ID]: "render-module",
        [VAR_RECORD_PAGE_OBJECT_ID]: "render-module",
        [VAR_RECORD_PARENT_ID]: "render",
    },
    pageStore: new PageModelAbstract(),
    visible: true,
};

render(<App {...props} />, document.getElementById("root"));
