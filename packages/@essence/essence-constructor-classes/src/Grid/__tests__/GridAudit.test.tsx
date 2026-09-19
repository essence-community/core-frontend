import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {AuditInfoContainer} from "../../AuditInfo/containers/AuditInfoContainer";

import "../../Button";

describe("GridAudit", () => {
    const bc = getBaseBc("audit", {type: "AUDIT_INFO"});

    it("render", () => {
        render(<Renderer bc={bc} component={AuditInfoContainer} />);

        expect(document.querySelector("button")).toBeInTheDocument();
    });
});
