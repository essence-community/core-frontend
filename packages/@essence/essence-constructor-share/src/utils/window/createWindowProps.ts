import {ICreateWindow, IBuilderConfig, IPageModel, IStoreBaseModel, IBuilderMode} from "../../types";
import {getWindowBc} from "./getWindowBc";
import {getDefaultWindowBc as getDefaultWindowBcDefault} from "./getDefaultWindowBc";
import {getWindowChilds} from "./getWindowChilds";

interface ICreateWindowProps {
    btnBc: IBuilderConfig;
    pageStore: IPageModel;
    parentStore: IStoreBaseModel;
    mode: IBuilderMode;
    getDefaultWindowBc?(bc: IBuilderConfig): IBuilderConfig;
}

/**
 * Create props for creating a new window
 */
export function createWindowProps(props: ICreateWindowProps): ICreateWindow {
    const {btnBc, pageStore, parentStore, mode, getDefaultWindowBc = getDefaultWindowBcDefault} = props;
    let windowBc = getWindowBc(btnBc, pageStore, parentStore);
    const isDefaultWindowsBc = !windowBc;
    const values =
        mode === "1" || !parentStore?.recordsStore?.selectedRecord ? {} : parentStore.recordsStore.selectedRecord;

    if (!windowBc) {
        windowBc = getDefaultWindowBc(parentStore.bc);
    }

    if (!windowBc.childs) {
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
        mode,
        values,
        windowBc: {
            mode,
            ...windowBc,
        },
    };
}
