import {setComponent} from "@essence-community/constructor-share";
import React from "react";

setComponent(
    "MONACO_EDITOR",
    React.lazy(() =>
        import(
            /* webpackChunkName: "MonacoEditor" */
            "./containers/MonacoEditor"
        ),
    ),
);

setComponent(
    "MONACO_DIFF_EDITOR",
    React.lazy(() =>
        import(
            /* webpackChunkName: "MonacoDiffEditor" */
            "./containers/MonacoDiffEditor"
        ),
    ),
);
