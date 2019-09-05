// @flow
import {action, observable, extendObservable} from "mobx";
import {getFromStore, saveToStore} from "@essence/essence-constructor-share/utils";
import forOwn from "lodash/forOwn";
import {type RecordsModelType} from "../RecordsModel";
import {GridModel, type GridBuilderType} from "../GridModel";
import {type CkIdType} from "../../BuilderType";
import {type RoutesModelType, type RoutesModelPropsType} from "./RoutesModelType";

const FAVORITS_KEY = "favorits";

export class RoutesModel extends GridModel implements RoutesModelType {
    recordsStore: RecordsModelType;

    favorits: Map<CkIdType, boolean>;

    constructor({pageStore}: RoutesModelPropsType) {
        const bc: GridBuilderType = {
            childwindow: [],
            ckObject: "routes",
            ckPageObject: "routes",
            ckQuery: "MTRoute",
            columns: [],
            cvName: "routes",
            filters: [],
            orderdirection: "",
            orderproperty: "",
            topbtn: [],
            type: "GRID",
        };

        super({bc, pageStore});

        extendObservable(this, {
            favorits: observable.map(),
        });

        forOwn(getFromStore(FAVORITS_KEY, {}), (value, key) => {
            this.favorits.set(Number(key), value);
        });
    }

    setFavoritsAction = action("setFavoritsAction", (ckId: CkIdType) => {
        this.favorits.set(ckId, !this.favorits.get(ckId));

        // $FlowFixMe
        saveToStore(FAVORITS_KEY, this.favorits.toJSON());
    });
}
