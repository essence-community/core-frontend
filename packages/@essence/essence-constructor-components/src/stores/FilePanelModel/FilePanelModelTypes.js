// @flow
import {type PageModelType} from "../PageModel/PageModelType";
import {type BuilderBaseType} from "../../BuilderType";
import {type RecordsModelType} from "../RecordsModel";
import {type ButtonConfigType} from "../ButtonModel/ButtonModelTypes";
import {type StoreBaseModelType} from "../StoreBaseModel/StoreBaseModelTypes";

export type FilePanelBcType = BuilderBaseType & {
    topbtn?: Array<ButtonConfigType>,
    columns?: Array<BuilderBaseType>,
    childs?: Array<BuilderBaseType>,
    maxfile?: string,
    filemode?: "single" | "multi",
};
export type FilePanelConstructorType = {
    bc: FilePanelBcType,
    pageStore: PageModelType,
};

export type FilePanelBtnNamesType =
    | "Override Cancel Button"
    | "Override Save Button"
    | "Override Delete Button"
    | "Override Download Button"
    | "Override Add Button";
export type FilePanelBtnsConfigType = {
    btns: Array<ButtonConfigType>,
    btnsCollector?: Array<ButtonConfigType>,
    overrides: {
        [FilePanelBtnNamesType]: ButtonConfigType,
    },
};

export type FilePanelChooseAwaitType = (file: File) => any;

export interface FilePanelModelInterface extends StoreBaseModelType {
    +recordsStore: RecordsModelType;
    +btnsConfig: FilePanelBtnsConfigType;
    +addFileAction: (mode: any, bc: any) => void;
    +getDownloadQueryParams: (fileId: string | number) => string;
    +deleteAction: (record: Object) => void;
}

export type FilePanelModelType = FilePanelModelInterface;
