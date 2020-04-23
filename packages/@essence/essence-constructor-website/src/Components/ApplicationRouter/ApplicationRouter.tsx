import * as React from "react";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";

const bc = {
    [VAR_RECORD_PAGE_OBJECT_ID]: "application",
    [VAR_RECORD_PARENT_ID]: "main",
    type: "APPLICATION",
};

export const ApplicationRouter: React.FC = () => {
    return (
        <>
            {mapComponents([bc], (Child, childBc) => (
                <Child key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} bc={childBc} pageStore={null} visible={true} />
            ))}
        </>
    );
};
