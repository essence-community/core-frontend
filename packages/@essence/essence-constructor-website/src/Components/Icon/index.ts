import {mapComponents} from "@essence-community/constructor-share/Icon/Icon";
import * as React from "react";

mapComponents.mdi = React.lazy(() =>
    import(
        /* webpackChunkName: "MDIIcon" */
        "./MDIIcon"
    ),
);
