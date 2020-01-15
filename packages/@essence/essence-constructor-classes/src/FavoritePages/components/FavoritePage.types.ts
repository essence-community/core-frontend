import {IRecord, IPagesModel, IRoutesModel} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
} from "@essence-community/constructor-share/constants/variables";

export interface IRoute extends IRecord {
    [VAR_RECORD_ID]: string;
    [VAR_RECORD_ROUTE_NAME]: string;
    [VAR_RECORD_ICON_NAME]: string | undefined;
}

export interface IFavoritePageProps {
    route: IRoute;
    pagesStore: IPagesModel;
    routesStore: IRoutesModel;
}
