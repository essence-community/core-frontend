import {IRecord} from "@essence/essence-constructor-share/types/Base";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_LEAF,
} from "@essence/essence-constructor-share/constants/variables";
import {IPagesModel} from "@essence/essence-constructor-share/types/PagesModel";
import {IRoutesModel} from "@essence/essence-constructor-share/types/RoutesModel";
import {PagesTreeModel} from "../../stores/PagesTreeModel";

export interface IRoute extends IRecord {
    [VAR_RECORD_ID]: string;
    [VAR_RECORD_ROUTE_NAME]: string;
    [VAR_RECORD_ICON_NAME]: string | undefined;
    [VAR_RECORD_LEAF]: "true" | "false";
}

export interface ITreeRowProps {
    route: IRoute;
    pagesStore: IPagesModel;
    routesStore: IRoutesModel;
    treeModel: PagesTreeModel;
    level: number;
    isOpen: boolean;
}
