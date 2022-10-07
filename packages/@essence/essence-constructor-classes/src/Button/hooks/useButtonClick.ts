/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as React from "react";
import {IBuilderConfig, IPageModel, IBuilderMode, FieldValue} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_JL_EDITING,
    VAR_RECORD_JV_MODE,
} from "@essence-community/constructor-share/constants";
import {
    FormContext,
    RecordContext,
    PopoverContext,
    IPopoverContext,
} from "@essence-community/constructor-share/context";
import {makeRedirect, deepFind} from "@essence-community/constructor-share/utils";
import {reaction} from "mobx";
import {handers} from "../handlers";
import {FileInputModel} from "../store/FileInputModel";

const DEFAULT_HANDLER = "defaultHandlerBtnAction";

const getHandlerBtn = (bc: IBuilderConfig) => {
    if (bc.handler === "false" || !bc.handler) {
        return bc.updatequery ? "updateBtnAction" : DEFAULT_HANDLER;
    }

    return bc.handler;
};

interface ISetGlobal {
    setGlobal: IBuilderConfig["setglobal"];
    pageStore: IPageModel;
    recordForm?: Record<string, FieldValue>;
    record?: Record<string, FieldValue>;
    mode: string;
    editing: boolean;
}

const setGlobal = ({editing, mode, pageStore, recordForm = {}, record = {}, setGlobal}: ISetGlobal) => {
    const globalValues: Record<string, FieldValue> = {};
    let isNeedAfter = false;

    setGlobal.forEach(({in: keyIn, out}) => {
        const [isExistForm, resForm] = deepFind(recordForm, keyIn);

        if (isExistForm || Object.prototype.hasOwnProperty.call(recordForm, out)) {
            globalValues[out] = isExistForm && keyIn ? resForm : record[out];
        } else {
            const [isExist, res] = deepFind(record, keyIn);

            if (!isExist && keyIn === VAR_RECORD_JL_EDITING) {
                globalValues[out] = editing;
                isNeedAfter = true;
            } else if (!isExist && keyIn === VAR_RECORD_JV_MODE) {
                globalValues[out] = mode;
                isNeedAfter = true;
            } else {
                globalValues[out] = isExist && keyIn ? res : record[out];
            }
        }
    });

    pageStore.updateGlobalValues(globalValues);

    return isNeedAfter;
};

const setGlobalAfter = ({pageStore, setGlobal}: ISetGlobal) => {
    const globalValues: Record<string, FieldValue> = {};

    setGlobal.forEach(({in: keyIn, out}) => {
        if (keyIn === VAR_RECORD_JL_EDITING) {
            globalValues[out] = undefined;
        } else if (keyIn === VAR_RECORD_JV_MODE) {
            globalValues[out] = undefined;
        }
    });

    pageStore.updateGlobalValues(globalValues);
};

interface IUserButtonClickProps {
    pageStore: IPageModel;
    bc: IBuilderConfig;
    disabled?: boolean;
    fileInputStore?: FileInputModel;
}

interface IData {
    files?: File[];
}

export function useButtonClick(
    props: IUserButtonClickProps,
): [() => Promise<void | boolean>, boolean, IPopoverContext] {
    const {pageStore, bc, disabled, fileInputStore} = props;
    const [isDisabled, setIsDisabled] = React.useState(false);
    const isMountedRef = React.useRef(false);
    const formValidation = React.useRef(null);
    const formCtx = React.useContext(FormContext);
    const recordCtx = React.useContext(RecordContext);
    const popoverCtx = React.useContext(PopoverContext);

    const handleMode = (data: IData = {}) => {
        let promise = null;
        const handlerBtn = getHandlerBtn(bc);
        const defaultHandler = handers[handlerBtn];
        let isNeedAfter = false;

        if (bc.setglobal && bc.setglobal.length) {
            isNeedAfter = setGlobal({
                editing: formCtx?.editing,
                mode: bc.modeaction || bc.mode,
                pageStore,
                record: recordCtx,
                recordForm: formCtx?.values,
                setGlobal: bc.setglobal,
            });
        }

        if (defaultHandler) {
            promise = defaultHandler({
                applicationStore: pageStore.applicationStore,
                bc,
                files: data.files,
                pageStore,
                popoverCtx,
            });
        } else {
            for (const ckPageObjectMain of [bc[VAR_RECORD_MASTER_ID], bc[VAR_RECORD_PARENT_ID]]) {
                if (ckPageObjectMain) {
                    const builderStore = pageStore.stores.get(ckPageObjectMain);

                    if (
                        builderStore &&
                        builderStore.handlers &&
                        typeof builderStore.handlers[handlerBtn] === "function"
                    ) {
                        promise = builderStore.handlers[handlerBtn](bc.mode as IBuilderMode, bc, {
                            form: formCtx,
                            popoverCtx,
                            record: recordCtx,
                            ...data,
                        });
                        break;
                    }

                    // @deprecated

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (builderStore && typeof builderStore[handlerBtn] === "function") {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        promise = builderStore[handlerBtn](bc.mode, bc, {
                            form: formCtx,
                            popoverCtx,
                            record: recordCtx,
                            ...data,
                        });
                        break;
                    }
                }
            }
        }

        if (promise instanceof Promise) {
            setIsDisabled(true);

            return promise.then((res) => {
                if (isMountedRef.current) {
                    if (!bc.noform && formCtx && !formCtx.isValid) {
                        if (!formValidation.current) {
                            setIsDisabled(!formCtx.isValid);
                            formValidation.current = reaction(
                                () => formCtx.isValid,
                                (isValid) => {
                                    setIsDisabled(!isValid);
                                    if (isValid) {
                                        formValidation.current();
                                        formValidation.current = null;
                                        if (isNeedAfter) {
                                            setGlobalAfter({
                                                editing: formCtx?.editing,
                                                mode: bc.modeaction || bc.mode,
                                                pageStore,
                                                record: recordCtx,
                                                recordForm: formCtx?.values,
                                                setGlobal: bc.setglobal,
                                            });
                                        }
                                    }
                                },
                                {
                                    fireImmediately: true,
                                },
                            );
                        }
                    } else {
                        setIsDisabled(false);
                        if (isNeedAfter) {
                            setGlobalAfter({
                                editing: formCtx?.editing,
                                mode: bc.modeaction || bc.mode,
                                pageStore,
                                record: recordCtx,
                                recordForm: formCtx?.values,
                                setGlobal: bc.setglobal,
                            });
                        }
                    }
                }

                return res;
            });
        }

        return Promise.resolve(null);
    };

    const handleClickDefer = () => {
        const {handler, redirecturl, redirectusequery, columnsfilter} = bc;

        if (disabled || isDisabled || handler === "none") {
            return null;
        }

        if (redirecturl || redirectusequery) {
            return makeRedirect({...bc, columnsfilter, redirecturl, redirectusequery}, pageStore, recordCtx);
        }

        if (fileInputStore) {
            return fileInputStore.initFileChooseAwait((files: File[]) => handleMode({files}));
        }

        return handleMode();
    };

    const handleClick = () => Promise.resolve().then(() => handleClickDefer());

    React.useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return [handleClick, isDisabled, popoverCtx];
}
