import {IPagesModel} from "@essence-community/constructor-share/types/PagesModel";
import {IRoutesModel} from "@essence-community/constructor-share/types/RoutesModel";
import {PagesTreeModel} from "../../stores/PagesTreeModel";

export interface ITreeRowsProps {
    routesStore: IRoutesModel;
    pagesStore: IPagesModel;
    parent: null | string;
    treeModel: PagesTreeModel;
    level: number;
}
