import type {ObservableMap} from "mobx";
import type {IRecordsModel} from "./RecordsModel";

export interface IRouteRecord {
    ck_icon: null | string;
    ck_id: string;
    ck_parent: null | string;
    cl_menu: 0 | 1;
    cl_static: 0 | 1;
    cn_action_edit: null | string;
    cn_order: 0 | 1;
    cr_type: 0 | 1;
    cv_icon_font: null | string;
    cv_icon_name: null | string;
    cv_name: string;
    cv_url: null | string;
    leaf: "false" | "true";
    root: string;
}

export interface IRoutesModel {
    favorits: ObservableMap;
    recordsStore: IRecordsModel;
    setFavoritsAction(ckId: string): void;
}
