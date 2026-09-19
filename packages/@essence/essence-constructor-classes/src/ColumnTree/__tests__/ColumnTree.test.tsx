import * as React from "react";
import {render, screen} from "@testing-library/react";
import {VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {Renderer} from "@essence-community/constructor-share/utils/test";
import {treeBc} from "../../Grid/__mock__/builderConfigs";
import {ColumnTreeContainer} from "../containers/ColumnTreeContainer";

const ROOT_KEY = "static:e3e33760864d44f88a9ecfe8f5da7a0b";

describe("ColumnTree", () => {
    it("render root", () => {
        render(
            <Renderer
                bc={treeBc}
                component={(props) => (
                    <RecordContext.Provider value={{type: "root"}}>
                        <ColumnTreeContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText(ROOT_KEY)).toBeInTheDocument();
        expect(document.querySelector("[data-page-object='tree-schevron']")).toBeInTheDocument();
    });

    it("render leaf=true integer", () => {
        render(
            <Renderer
                bc={treeBc}
                component={(props) => (
                    <RecordContext.Provider value={{[VAR_RECORD_LEAF]: "true", cv_value: "100500"}}>
                        <ColumnTreeContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText("100500")).toBeInTheDocument();
        expect(document.querySelector("[data-page-object='tree-schevron']")).not.toBeInTheDocument();
        expect(document.querySelector(".fa-file-o")).toBeInTheDocument();
    });

    it("render leaf=false integer", () => {
        render(
            <Renderer
                bc={treeBc}
                component={(props) => (
                    <RecordContext.Provider value={{[VAR_RECORD_LEAF]: "false", cv_value: "100500"}}>
                        <ColumnTreeContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText("100500")).toBeInTheDocument();
        expect(document.querySelector("[data-page-object='tree-schevron']")).toBeInTheDocument();
    });
});
