import {IRecord} from "@essence-community/constructor-share/types/Base";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_LEAF,
} from "@essence-community/constructor-share/constants/variables";
import {IPagesModel} from "@essence-community/constructor-share/types/PagesModel";
import {IRoutesModel} from "@essence-community/constructor-share/types/RoutesModel";
import {IPageModel} from "@essence-community/constructor-share/types";
import {PagesTreeModel} from "../../stores/PagesTreeModel";

export interface IRoute extends IRecord {
    [VAR_RECORD_ID]: string;
    [VAR_RECORD_ROUTE_NAME]: string;
    [VAR_RECORD_ICON_NAME]: string | undefined;
    [VAR_RECORD_LEAF]: "true" | "false" | boolean;
}

export interface ITreeRowProps {
    route: IRoute;
    pagesStore: IPagesModel;
    routesStore: IRoutesModel;
    treeModel: PagesTreeModel;
    pageStore: IPageModel;
    level: number;
    isOpen: boolean;
}
