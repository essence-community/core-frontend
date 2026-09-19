import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer, createEmptyPageStore} from "@essence-community/constructor-share/utils/test";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {GridInlineContainer} from "../containers/GridInlineContainer";
import {GridModel} from "../stores/GridModel";
import {gridBc} from "../__mock__/builderConfigs";

import "../../Button";

describe("GridInlineContainer", () => {
    it("render", () => {
        const pageStore = createEmptyPageStore();
        const store = new GridModel({bc: gridBc, pageStore});

        pageStore.addStore(store, gridBc.ck_page_object, true);

        const bc = getBaseBc("inline", {
            [VAR_RECORD_PARENT_ID]: gridBc.ck_page_object,
            mode: "1",
            type: "INLINE_WINDOW",
        });

        const {container} = render(<Renderer bc={bc} component={GridInlineContainer} pageStore={pageStore} />);

        expect(container.querySelector("div")).toBeInTheDocument();
    });
});
