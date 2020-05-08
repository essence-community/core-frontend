// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {type FilterModelType} from "../stores/FilterModel";
import {type PageModelType} from "../stores/PageModel";
import {styleTheme} from "../constants";
import {type BuilderBaseType} from "../BuilderType";
import {type BuilderFilterType} from "./BuilderFilterType";

type PropsType = {|
    bc: BuilderFilterType,
    parentBc?: BuilderBaseType,
    disabled?: boolean,
    open: boolean,
    store: FilterModelType,
    pageStore: PageModelType,
    visible: boolean,
|};

class BuilderFilterButtons extends React.Component<PropsType> {
    btnsFilter: Object;

    // eslint-disable-next-line max-lines-per-function
    constructor(props: PropsType) {
        super(props);

        const {bc} = props;

        this.btnsFilter = {
            buttonChevronConfigClose: {
                [VAR_RECORD_DISPLAYED]: "static:76dd4f170842474d9776fe712e48d8e6",
                [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PARENT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron`,
                handler: "onFilterToggle",
                iconfont: "chevron-down",
                onlyicon: "true",
                readonly: "false",
                type: "BTN",
                uitype: "11",
            },
            buttonChevronConfigOpen: {
                [VAR_RECORD_DISPLAYED]: "static:72b93dbe37884153a95363420b9ceb59",
                [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PARENT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron`,
                handler: "onFilterToggle",
                iconfont: "chevron-up",
                onlyicon: "true",
                readonly: "false",
                type: "BTN",
                uitype: "11",
            },
            buttonResetConfig: {
                [VAR_RECORD_DISPLAYED]: "static:cda88d85fb7e4a88932dc232d7604bfb",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-reset`,
                handler: "onReset",
                iconfont: styleTheme === "light" ? "broom" : "eraser",
                iconfontname: "mdi",
                onlyicon: "true",
                readonly: "false",
                type: "BTN",
                uitype: "11",
            },
            buttonSearchConfig: {
                [VAR_RECORD_DISPLAYED]: "static:704af666dbd3465781149e4282df5dcf",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-search`,
                handler: bc.topbtn ? "onSearch" : undefined,
                iconfont: "search",
                onlyicon: "true",
                readonly: "false",
                type: "BTN",
                uitype: "11",
            },
        };
    }

    render() {
        const {disabled, bc, pageStore, visible, open, store} = this.props;
        const {topbtn} = bc;
        const btns = [
            open ? this.btnsFilter.buttonChevronConfigOpen : this.btnsFilter.buttonChevronConfigClose,
            {
                ...this.btnsFilter.buttonSearchConfig,
                disable: styleTheme === "dark" && open === false ? "true" : undefined,
                required: store.isFormDirty ? "true" : "false",
            },
            {
                ...this.btnsFilter.buttonResetConfig,
                disable: styleTheme === "dark" && open === false ? "true" : undefined,
            },
        ];

        if (!topbtn) {
            return mapComponents(btns, (ChildCmp, childBc) => (
                <ChildCmp
                    key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                    bc={childBc}
                    disabled={disabled}
                    pageStore={pageStore}
                    visible={visible}
                />
            ));
        }

        return mapComponents(topbtn, (ChildCmp, childBc) => (
            <ChildCmp
                key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                bc={{...childBc, topbtn: childBc.topbtn ? [...childBc.topbtn, ...btns] : btns}}
                disabled={disabled}
                pageStore={pageStore}
                visible={visible}
            />
        ));
    }
}

export default observer(BuilderFilterButtons);
