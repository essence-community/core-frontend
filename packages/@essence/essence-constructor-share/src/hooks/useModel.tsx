/* eslint-disable sort-keys */
/* eslint-disable max-lines-per-function */
/* eslint-disable capitalized-comments */
import * as React from "react";
import {v4} from "uuid";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel, IStoreBaseModel} from "../types";
import {checkAutoload} from "../decorators/utils";
import {loggerRoot, VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {parseMemoize} from "../utils/parser";
import {IRecord} from "../types/Base";
import {useGetValue} from "./useCommon/useGetValue";

interface IUseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    hidden?: boolean;
}

const AUTO_LOAD_KEY = "__autoload__";

const logger = loggerRoot.extend("useModel");

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
    const getValueGlobal = useGetValue({pageStore});
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

    React.useEffect(() => {
        if (store.recordsStore) {
            store.recordsStore.setGetValue(getValueGlobal);
        }
    }, [store, getValueGlobal]);

    React.useEffect(() => {
        if (bc.autoloadrule && store.recordsStore) {
            return reaction(
                () => {
                    const result = {} as Record<string, any>;

                    result[AUTO_LOAD_KEY] = checkAutoload({bc, pageStore});

                    const getValue = (name: string) => {
                        result[name] = getValueGlobal(name);

                        return result[name];
                    };

                    const isAutoloadRule = parseMemoize(bc.autoloadrule!).runer({get: getValue});

                    result[AUTO_LOAD_KEY] = result[AUTO_LOAD_KEY] && isAutoloadRule;

                    return result;
                },
                (val) => {
                    if (val[AUTO_LOAD_KEY]) {
                        store.recordsStore?.searchAction({}, {reset: true});
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [store, bc, pageStore, getValueGlobal]);

    React.useEffect(() => {
        if (bc.recordsrule && store.recordsStore) {
            return reaction(
                () => {
                    const getValue = (name: string) => {
                        return getValueGlobal(name) || [];
                    };

                    return parseMemoize(bc.recordsrule!).runer({get: getValue}) as any;
                },
                (val: IRecord[] | string) => {
                    let rec = val;

                    if (typeof val === "string" && val.startsWith("[") && val.endsWith("]")) {
                        try {
                            rec = JSON.parse(val);
                        } catch (e) {
                            logger(val);
                            logger(e);
                            rec = [];
                        }
                    }
                    store.recordsStore?.clearRecordsAction();
                    store.recordsStore?.setRecordsAction(Array.isArray(rec) ? rec : []);
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [store, bc, pageStore, getValueGlobal]);

    React.useEffect(() => {
        if (bc.saverecordstoglobal && store.recordsStore) {
            const fn = reaction(
                () => store.recordsStore?.recordsState.records,
                (val: IRecord[]) => {
                    pageStore.updateGlobalValues({
                        [bc.saverecordstoglobal as string]: val ? JSON.parse(JSON.stringify(val)) : undefined,
                    });
                },
                {
                    fireImmediately: true,
                },
            );

            return () => {
                fn();
                pageStore.updateGlobalValues({
                    [bc.saverecordstoglobal as string]: undefined,
                });
            };
        }
    }, [store, bc, pageStore]);

    return [store, isAutoLoad, storeName];
}
