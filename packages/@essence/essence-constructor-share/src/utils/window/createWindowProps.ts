import {IBuilderConfig, IPageModel, IStoreBaseModel, IBuilderMode} from "../../types";
import {IRecord} from "../../types/Base";
import {getWindowBc} from "./getWindowBc";
import {getDefaultWindowBc as getDefaultWindowBcDefault} from "./getDefaultWindowBc";
import {getWindowChilds} from "./getWindowChilds";

interface ICreateWindowProps {
    btnBc: IBuilderConfig;
    pageStore: IPageModel;
    parentStore?: IStoreBaseModel;
    mode: IBuilderMode;
    getDefaultWindowBc?(bc: IBuilderConfig): IBuilderConfig;
    initValues?: IRecord;
}

/**
 * Create props for creating a new window
 */
export function createWindowProps(props: ICreateWindowProps): IBuilderConfig {
    const {
        btnBc,
        pageStore,
        parentStore,
        mode,
        getDefaultWindowBc = getDefaultWindowBcDefault,
        initValues = {},
    } = props;
    let windowBc = getWindowBc(btnBc, pageStore, parentStore);
    const isDefaultWindowsBc = !windowBc;
    const values =
        mode === "1" || !parentStore?.recordsStore?.selectedRecord
            ? initValues || {}
            : parentStore?.recordsStore?.selectedRecord;

    if (!windowBc && parentStore) {
        windowBc = getDefaultWindowBc(parentStore.bc);
    } else {
        windowBc = getDefaultWindowBc(btnBc);
    }

    if (windowBc && !windowBc.childs) {
        windowBc = {
            ...windowBc,
            childs: getWindowChilds({
                autobuild: isDefaultWindowsBc,
                pageStore,
                values,
                windowBc,
            }),
        };
    }

    return {
        ...windowBc,
        mode,
        values,
    };
}
