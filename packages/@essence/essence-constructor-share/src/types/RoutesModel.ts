import {ObservableMap} from "mobx";
import {FieldValue} from "./Base";
import {IRecordsModel} from ".";

/**
 * RouterRecord
 *
 * ck_icon: null;
 * ck_id: "4";
 * ck_parent: null;
 * cl_menu: 1;
 * cl_static: 0;
 * cn_action_edit: null;
 * cn_order: 1;
 * cr_type: 0;
 * cv_icon_font: null;
 * cv_icon_name: null;
 * cv_name: "CORE";
 * cv_url: null;
 * leaf: "false";
 * root: "CORE";
 */

export interface IRouteRecord {
    [key: string]: FieldValue;
}

export interface IRoutesModel {
    favorits: ObservableMap;
    recordsStore: IRecordsModel;
    setFavoritsAction(ckId: string): void;
}
