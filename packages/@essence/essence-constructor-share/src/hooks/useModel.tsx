import * as React from "react";
import uuid from "uuid";
import {IBuilderConfig, IPageModel, IRecordsModel, IStoreBaseModel} from "../types";
import {checkAutoload} from "../decorators/utils";

interface IUseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    hidden?: boolean;
}

interface IModelRequired extends IStoreBaseModel {
    hidden?: boolean;
    disabled?: boolean;
    recordsStore: IRecordsModel;
}

export function useModel<IModel extends IModelRequired, P extends IUseModelProps>(
    createModel: (props: P) => IModel,
    props: P,
): [IModel, boolean] {
    const {bc, pageStore, hidden, disabled} = props;
    const [store, setStore] = React.useState<IModel>(() => createModel(props));
    const [isAutoLoad, setIsAutoload] = React.useState(false);

    React.useEffect(() => {
        const ckPageObject = bc.ckPageObject || uuid();
        // Const storeNext: IModel = createModel(props);
        const storeNext = store;
        const isAutoLoadNext = checkAutoload({bc, pageStore, recordsStore: storeNext.recordsStore});

        pageStore.addStore(storeNext, ckPageObject);

        setStore(storeNext);
        setIsAutoload(isAutoLoadNext);

        return () => {
            pageStore.removeStore(bc.ckPageObject, storeNext);
        };
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

    return [store, isAutoLoad];
}
