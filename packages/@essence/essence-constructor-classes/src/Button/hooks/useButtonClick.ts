import * as React from "react";
import {IBuilderConfig, IPageModel, IBuilderMode} from "@essence-community/constructor-share/types";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {
    FormContext,
    RecordContext,
    PopoverContext,
    IPopoverContext,
} from "@essence-community/constructor-share/context";
import {makeRedirect} from "@essence-community/constructor-share/utils";
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
                    if (formCtx && !formCtx.isValid) {
                        if (!formValidation.current) {
                            setIsDisabled(!formCtx.isValid);
                            formValidation.current = reaction(
                                () => formCtx.isValid,
                                (isValid) => {
                                    setIsDisabled(!isValid);
                                    if (isValid) {
                                        formValidation.current();
                                        formValidation.current = null;
                                    }
                                },
                                {
                                    fireImmediately: true,
                                },
                            );
                        }
                    } else {
                        setIsDisabled(false);
                    }
                }

                return res;
            });
        }

        return Promise.resolve(null);
    };

    const handleClickDefer = () => {
        const {redirecturl, redirectusequery, columnsfilter} = bc;

        if (disabled || isDisabled) {
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
