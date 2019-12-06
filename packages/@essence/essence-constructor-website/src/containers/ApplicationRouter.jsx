import * as React from "react";
import {mapComponents} from "@essence/essence-constructor-share";

export class ApplicationRouter extends React.Component {
    render() {
        const bc = {
            ckPageObject: "application",
            type: "APPLICATION",
        };

        return mapComponents([bc], (Child, childBc) => <Child key={childBc.ckPageObject} bc={childBc} />);
    }
}
