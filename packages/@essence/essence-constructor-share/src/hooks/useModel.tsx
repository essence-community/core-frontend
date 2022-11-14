/* eslint-disable sort-keys */
/* eslint-disable max-lines-per-function */
/* eslint-disable capitalized-comments */
import * as React from "react";
import {v4} from "uuid";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel, IStoreBaseModel} from "../types";
import {checkAutoload} from "../decorators/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {FormContext, ParentFieldContext, RecordContext} from "../context";
import {deepFind} from "../utils";
import {parseMemoize} from "../utils/parser";
import {IRecord} from "../types/Base";

interface IUseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    disabled?: boolean;
    hidden?: boolean;
}

const AUTO_LOAD_KEY = "__autoload__";

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
    const form = React.useContext(FormContext);
    const record = React.useContext(RecordContext);
    const parentField = React.useContext(ParentFieldContext);
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
        if (bc.autoloadrule && store.recordsStore) {
            return reaction(
                () => {
                    const result = {} as Record<string, any>;

                    result[AUTO_LOAD_KEY] = checkAutoload({bc, pageStore});

                    const getValue = (name: string) => {
                        if (name.charAt(0) === "g") {
                            return pageStore.globalValues.get(name);
                        }

                        if (record) {
                            const [isExistRecord, recValue] = deepFind(record, name);

                            if (isExistRecord) {
                                result[name] = recValue;

                                return recValue;
                            }
                        }

                        if (form) {
                            const values = form.values;

                            if (parentField) {
                                const [isExistParent, val] = deepFind(values, `${parentField.key}.${name}`);

                                if (isExistParent) {
                                    result[name] = val;

                                    return val;
                                }
                            }

                            const [isExist, val] = deepFind(values, name);

                            if (isExist) {
                                result[name] = val;

                                return val;
                            }
                        }

                        return undefined;
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
    }, [store, bc, pageStore, record, form, parentField]);

    React.useEffect(() => {
        if (bc.recordsrule && store.recordsStore) {
            return reaction(
                () => {
                    const getValue = (name: string) => {
                        if (name.charAt(0) === "g") {
                            return pageStore.globalValues.get(name);
                        }

                        if (record) {
                            const [isExistRecord, recValue] = deepFind(record, name);

                            if (isExistRecord) {
                                return recValue;
                            }
                        }

                        if (form) {
                            const values = form.values;

                            if (parentField) {
                                const [isExistParent, val] = deepFind(values, `${parentField.key}.${name}`);

                                if (isExistParent) {
                                    return val;
                                }
                            }

                            const [isExist, val] = deepFind(values, name);

                            if (isExist) {
                                return val;
                            }
                        }

                        return [];
                    };

                    return parseMemoize(bc.recordsrule!).runer({get: getValue}) as any;
                },
                (val: IRecord[]) => {
                    store.recordsStore?.clearRecordsAction();
                    store.recordsStore?.setRecordsAction(Array.isArray(val) ? val : []);
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [store, bc, pageStore, record, form, parentField]);

    return [store, isAutoLoad, storeName];
}
