// @flow
import * as React from "react";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridColumnIcon from "../GridColumnIcon";
import BuilderMobxButton from "../../../Button/BuilderMobxButton";
import GridColumnLink from "../GridColumnLink/GridColumnLink";
import {gridBc, iconBc} from "../../__mock__/builderConfigs";

describe("GridColumnIcon", () => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});
    const props = {
        bc: iconBc,
        gridBc,
        pageStore,
        store,
        visible: true,
    };

    it("render default", () => {
        const wrapper = mountWithTheme(<GridColumnIcon {...props} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("edit");
        expect(wrapper.find(BuilderMobxButton).exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render GridColumnLink", () => {
        const wrapper = mountWithTheme(<GridColumnIcon {...props} bc={{...iconBc, handler: "showMenu"}} />);

        expect(wrapper.find(BuilderMobxButton).exists()).toBeFalsy();
        expect(wrapper.find(GridColumnLink).exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render dynamicicon", () => {
        const wrapper = mountWithTheme(
            <GridColumnIcon
                {...props}
                bc={{...iconBc, dynamicicon: "true", iconfont: "cv_icon", iconfontColumn: "cvIcon"}}
                record={{cvIcon: "add"}}
            />,
        );

        expect(wrapper.find(BuilderMobxButton).exists()).toBeFalsy();

        expect(wrapper.find(Icon).prop("iconfont")).toBe("add");

        wrapper.setProps({record: {cvIcon: "edit"}});

        expect(wrapper.find(Icon).prop("iconfont")).toBe("edit");

        wrapper.unmount();
    });
});
