import * as React from "react";
import {render, screen} from "@testing-library/react";
import {RecordContext} from "@essence-community/constructor-share/context";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {iconBc} from "../../Grid/__mock__/builderConfigs";
import {ColumnIconContainer} from "../containers/ColumnIconContainer";

import "../../Button";

describe("ColumnIcon", () => {
    it("render default", () => {
        render(<Renderer bc={iconBc} component={ColumnIconContainer} />);

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(document.querySelector(".fa-edit")).toBeInTheDocument();
    });

    it("render ColumnIconLink", () => {
        render(
            <Renderer
                bc={getBaseBc("icon", {...iconBc, handler: "showMenu"})}
                component={ColumnIconContainer}
            />,
        );

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("render dynamicicon", () => {
        const bc = getBaseBc("icon", {
            ...iconBc,
            dynamicicon: true,
            iconfont: "cv_icon",
            iconfontname: "fa",
        });

        const {unmount} = render(
            <Renderer
                bc={bc}
                component={(props) => (
                    <RecordContext.Provider value={{cv_icon: "add"}}>
                        <ColumnIconContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(document.querySelector(".fa-add")).toBeInTheDocument();

        unmount();

        render(
            <Renderer
                bc={bc}
                component={(props) => (
                    <RecordContext.Provider value={{cv_icon: "edit"}}>
                        <ColumnIconContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(document.querySelector(".fa-edit")).toBeInTheDocument();
    });
});
