import {IRecord, IPagesModel, IRoutesModel} from "@essence/essence-constructor-share/types";

export interface IRoute extends IRecord {
    ckId: string;
    cvName: string;
    cvIconName?: string;
}

export interface IFavoritePageProps {
    route: IRoute;
    pagesStore: IPagesModel;
    routesStore: IRoutesModel;
}
