/* eslint-disable capitalized-comments */
import * as React from "react";
import {v4} from "uuid";
import {IBuilderConfig, IPageModel, IStoreBaseModel} from "../types";
import {checkAutoload} from "../decorators/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../constants";

interface IUseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    hidden?: boolean;
}

/**
 * isAutoLoad moved to useMemo to pass this value immediately
 * Call loadRecordsAction in the first useEffect lifecycli
 */
export function useModel<IModel extends IStoreBaseModel, P extends IUseModelProps>(
    createModel: (props: P) => IModel,
    props: P,
): [IModel, boolean, string] {
    const {bc, pageStore, hidden, disabled} = props;
    const pageObjectId = bc[VAR_RECORD_PAGE_OBJECT_ID];
    const [store] = React.useState<IModel>(() => createModel(props));
    // const [isAutoLoad, setIsAutoload] = React.useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isAutoLoad = React.useMemo(() => checkAutoload({bc, pageStore}), []);
    /*
     * const [storeName, setStoreName] = React.useState<string>(function getStoreName() {
     *     return bc[VAR_RECORD_PAGE_OBJECT_ID] || uuid();
     * });
     */
    const storeName = React.useMemo(() => {
        const name = pageObjectId || v4();

        return pageStore.addStore(store, name, true);
    }, [pageObjectId, pageStore, store]);

    React.useEffect(() => {
        /*
         * const storeNext: IModel = createModel(props);
         * const storeNext = store;
         * const isAutoLoadNext = checkAutoload({bc, pageStore});
         * const name = pageStore.addStore(storeNext, storeName, true);
         * setStore(storeNext);
         * setStoreName(name);
         * setIsAutoload(isAutoLoadNext);
         */

        return () => {
            pageStore.removeStore(storeName, store);
        };
    }, [pageStore, store, storeName]);

    React.useEffect(() => {
        store.disabled = disabled;
        store.hidden = hidden;
    }, [disabled, hidden, store]);

    React.useEffect(() => {
        if (isAutoLoad && store.recordsStore && !store.recordsStore.isLoading) {
            store.recordsStore.loadRecordsAction({status: "autoload"});
        }
    }, [isAutoLoad, store]);

    return [store, isAutoLoad, storeName];
}
