/* eslint-disable sort-keys */
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants/variables";
import * as React from "react";
import {Grid} from "@material-ui/core";
import {useModel} from "@essence-community/constructor-share/hooks";
import {IRecord, IStoreBaseModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react";
import {mapComponents, getComponent} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useField} from "@essence-community/constructor-share/Form";
import {IClassWithEditingProps} from "../store/FieldItemSelectorModel.types";
import {FieldItemSelectorModel} from "../store/FieldItemSelectorModel";

// eslint-disable-next-line max-lines-per-function
export const FieldItemSelector: React.FC<IClassWithEditingProps> = (props) => {
    const applicationStore = props.pageStore.applicationStore;
    const {editing, bc} = props;
    const clearValue = React.useMemo(() => {
        return {
            D: [],
            I: [],
        };
    }, []);
    const field = useField({
        bc,
        pageStore: props.pageStore,
        isObject: true,
        clearValue,
    });
    const [store] = useModel((modelProps) => new FieldItemSelectorModel(modelProps), {
        applicationStore,
        bc,
        disabled: props.disabled,
        hidden: props.hidden,
        pageStore: props.pageStore,
        field,
    });

    const [ComponentFieldFrom, ComponentFieldTo] = React.useMemo(
        () => [
            getComponent(store.fieldFrom.type) as React.ComponentClass<IClassWithEditingProps>,
            getComponent(store.fieldTo.type) as React.ComponentClass<IClassWithEditingProps>,
        ],
        [store],
    );
    const hasError = React.useMemo(
        () => !ComponentFieldFrom || !ComponentFieldTo,
        [ComponentFieldFrom, ComponentFieldTo],
    );

    const [btnAddAll, btnAddSelected, btnRemoveSelected, btnRemoveAll] = React.useMemo(
        (): IBuilderConfig[] => [
            {
                [VAR_RECORD_DISPLAYED]: "static:d78431bbcb484da4b516bc00626965ba",
                [VAR_RECORD_MASTER_ID]: store.fieldFrom[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-add-all`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                disabledemptymaster: true,
                getglobaltostore: bc.getglobaltostore || store.fieldFrom.getglobaltostore,
                handler: "addAll",
                iconfont: "fa-angle-double-right",
                iconfontname: "fa",
                onlyicon: true,
                type: "BTN",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:833289fd818f4340b584beb9068f670b",
                [VAR_RECORD_MASTER_ID]: store.fieldFrom[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-add-selected`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                getglobaltostore: bc.getglobaltostore || store.fieldFrom.getglobaltostore,
                handler: "addSelected",
                iconfont: "fa-angle-right",
                iconfontname: "fa",
                onlyicon: true,
                type: "BTN",
                uitype: "1",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:67677d8e457c409daaef5fe5b90ec491",
                [VAR_RECORD_MASTER_ID]: store.fieldTo[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-selected`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                getglobaltostore: bc.getglobaltostore || store.fieldTo.getglobaltostore,
                handler: "removeSelected",
                iconfont: "fa-angle-left",
                iconfontname: "fa",
                onlyicon: true,
                type: "BTN",
                uitype: "1",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:c4684efb2ea444f4b9192db3c4b4b843",
                [VAR_RECORD_MASTER_ID]: store.fieldTo[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-all`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                disabledemptymaster: true,
                getglobaltostore: bc.getglobaltostore || store.fieldTo.getglobaltostore,
                handler: "removeAll",
                iconfont: "fa-angle-double-left",
                iconfontname: "fa",
                onlyicon: true,
                type: "BTN",
                uitype: "1",
            },
        ],
        [bc, store],
    );
    const [fromStore, setFromStore] = React.useState<IStoreBaseModel | undefined>(undefined);
    const [toStore, setToStore] = React.useState<IStoreBaseModel | undefined>(undefined);
    const checkDisabled = React.useCallback((gridStore?: IStoreBaseModel) => {
        if (!gridStore || !gridStore.recordsStore) {
            return false;
        }

        return gridStore.bc.selmode === "MULTI" || gridStore.bc.collectionvalues === "array"
            ? gridStore.recordsStore.selectedRecords.size === 0
            : !gridStore.recordsStore.selectedRecord;
    }, []);

    React.useEffect(() => {
        const disposers: ReturnType<typeof reaction>[] = [];

        disposers.push(
            reaction(() => props.pageStore.stores.get(store.fieldFrom[VAR_RECORD_PAGE_OBJECT_ID]), setFromStore, {
                fireImmediately: true,
            }),
        );
        disposers.push(
            reaction(() => props.pageStore.stores.get(store.fieldTo[VAR_RECORD_PAGE_OBJECT_ID]), setToStore, {
                fireImmediately: true,
            }),
        );

        return () => disposers.forEach((disposer) => disposer());
    }, [hasError, props.pageStore, store]);

    React.useEffect(() => {
        const disposers: ReturnType<typeof reaction>[] = [];

        if (toStore && fromStore) {
            disposers.push(
                reaction(
                    () => fromStore.recordsStore!.recordsState.status,
                    (status) => {
                        if (
                            status !== "set" &&
                            status !== "add" &&
                            status !== "sort" &&
                            status !== "remove" &&
                            ((!fromStore.bc.winreloadstores && bc.querymode !== "local") || bc.querymode === "local")
                        ) {
                            const value = store.field.value as any as {I: IRecord[]; D: IRecord[]};

                            if (value.I && value.I.length > 0) {
                                fromStore.recordsStore!.removeRecordsAction(value.I, store.fieldName, true);
                            }
                            if (value.D && value.D.length > 0) {
                                fromStore.recordsStore.addRecordsAction(value.D);
                            }
                        }
                    },
                    {
                        fireImmediately: true,
                    },
                ),
            );
            disposers.push(
                reaction(
                    () => toStore.recordsStore!.recordsState.status,
                    (status) => {
                        if (
                            status !== "set" &&
                            status !== "add" &&
                            status !== "sort" &&
                            status !== "remove" &&
                            ((!toStore.bc.winreloadstores && bc.querymode !== "local") || bc.querymode === "local")
                        ) {
                            const value = store.field.value as any as {I: IRecord[]; D: IRecord[]};

                            if (value.D && value.D.length > 0) {
                                toStore.recordsStore!.removeRecordsAction(value.D, store.fieldName, true);
                            }
                            if (value.I && value.I.length > 0) {
                                toStore.recordsStore.addRecordsAction(value.I);
                            }
                        }
                    },
                    {
                        fireImmediately: true,
                    },
                ),
            );
        }

        return () => disposers.forEach((disposer) => disposer());
    }, [hasError, fromStore, toStore, bc, store]);

    return useObserver(() => {
        const {disabled, pageStore, visible} = props;

        if (hasError) {
            return null;
        }

        return (
            <Grid
                container
                wrap="nowrap"
                spacing={1}
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                alignItems="stretch"
            >
                <Grid item xs zeroMinWidth>
                    {ComponentFieldFrom ? (
                        <ComponentFieldFrom
                            bc={store.fieldFrom}
                            editing={editing}
                            disabled={disabled}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ) : null}
                </Grid>
                <Grid item>
                    <Grid style={{height: "100%"}} container spacing={0} direction="column" justify="center">
                        <Grid item>
                            {mapComponents([btnAddAll], (ChildCmp, childBc) => (
                                <ChildCmp
                                    key="add-all"
                                    disabled={disabled}
                                    bc={childBc}
                                    pageStore={pageStore}
                                    visible={visible}
                                />
                            ))}
                        </Grid>
                        <Grid item>
                            {mapComponents([btnAddSelected], (ChildCmp, childBc) => (
                                <ChildCmp
                                    key="add-selected"
                                    disabled={disabled || checkDisabled(fromStore)}
                                    bc={childBc}
                                    pageStore={pageStore}
                                    visible={visible}
                                />
                            ))}
                        </Grid>
                        <Grid item>
                            {mapComponents([btnRemoveSelected], (ChildCmp, childBc) => (
                                <ChildCmp
                                    key="remove-selected"
                                    disabled={disabled || checkDisabled(toStore)}
                                    bc={childBc}
                                    pageStore={pageStore}
                                    visible={visible}
                                />
                            ))}
                        </Grid>
                        <Grid item>
                            {mapComponents([btnRemoveAll], (ChildCmp, childBc) => (
                                <ChildCmp
                                    key="remove-all"
                                    disabled={disabled}
                                    bc={childBc}
                                    pageStore={pageStore}
                                    visible={visible}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs zeroMinWidth>
                    {ComponentFieldTo ? (
                        <ComponentFieldTo
                            bc={store.fieldTo}
                            editing={editing}
                            disabled={disabled}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ) : null}
                </Grid>
            </Grid>
        );
    });
};
