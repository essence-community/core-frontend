import * as React from "react";
import {mapComponents} from "@essence/essence-constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";

export class ApplicationRouter extends React.Component {
    render() {
        const bc = {
            [VAR_RECORD_PAGE_OBJECT_ID]: "application",
            type: "APPLICATION",
        };

        return mapComponents([bc], (Child, childBc) => <Child key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} bc={childBc} />);
    }
}
