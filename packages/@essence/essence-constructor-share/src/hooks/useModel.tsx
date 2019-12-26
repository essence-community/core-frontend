import * as React from "react";
import uuid from "uuid";
import {IBuilderConfig, IPageModel, IRecordsModel, IStoreBaseModel} from "../types";
import {checkAutoload} from "../decorators/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../constants";

interface IUseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    hidden?: boolean;
}

interface IModelRequired extends IStoreBaseModel {
    hidden?: boolean;
    disabled?: boolean;
    recordsStore?: IRecordsModel;
}

export function useModel<IModel extends IModelRequired, P extends IUseModelProps>(
    createModel: (props: P) => IModel,
    props: P,
): [IModel, boolean, string] {
    const {bc, pageStore, hidden, disabled} = props;
    const [store, setStore] = React.useState<IModel>(() => createModel(props));
    const [isAutoLoad, setIsAutoload] = React.useState(false);
    const [storeName, setStoreName] = React.useState<string>(bc[VAR_RECORD_PAGE_OBJECT_ID] || uuid());

    React.useEffect(() => {
        // Const storeNext: IModel = createModel(props);
        const storeNext = store;
        const isAutoLoadNext = checkAutoload({bc, pageStore, recordsStore: storeNext.recordsStore});

        const name = pageStore.addStore(storeNext, storeName, true);

        setStore(storeNext);
        setStoreName(name);
        setIsAutoload(isAutoLoadNext);

        return () => {
            pageStore.removeStore(name, storeNext);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bc, createModel, pageStore, store]);

    React.useEffect(() => {
        if (store) {
            store.disabled = disabled;
            store.hidden = hidden;
        }
    }, [disabled, hidden, store]);

    React.useEffect(() => {
        if (store) {
            if (isAutoLoad && store.recordsStore && !store.recordsStore.isLoading) {
                store.recordsStore.loadRecordsAction({status: "autoload"});
            }
        }
    }, [isAutoLoad, store]);

    return [store, isAutoLoad, storeName];
}
