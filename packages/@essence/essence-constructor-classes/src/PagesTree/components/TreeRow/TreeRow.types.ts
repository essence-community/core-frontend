import {IRecord} from "@essence/essence-constructor-share/types/Base";
import {IPagesModel} from "@essence/essence-constructor-share/types/PagesModel";
import {IRoutesModel} from "@essence/essence-constructor-share/types/RoutesModel";
import {PagesTreeModel} from "../../stores/PagesTreeModel";

export interface IRoute extends IRecord {
    ckId: string;
    cvName: string;
    cvIconName?: string;
    leaf: "true" | "false";
}

export interface ITreeRowProps {
    route: IRoute;
    pagesStore: IPagesModel;
    routesStore: IRoutesModel;
    treeModel: PagesTreeModel;
    level: number;
    isOpen: boolean;
}
