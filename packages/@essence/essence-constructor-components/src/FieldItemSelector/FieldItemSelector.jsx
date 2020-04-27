// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction} from "mobx";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {setComponent, getComponent, mapComponents} from "@essence-community/constructor-share/components";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {loggerRoot} from "../constants";
import {type PageModelType} from "../stores/PageModel";
import {type GridModelType} from "../stores/GridModel";
import withModelDecorator from "../decorators/withModelDecorator";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {FieldItemSelectorModel, type FieldItemSelectorModelType} from "../stores/FieldItemSelectorModel";
import {type BuilderGridType} from "../Grid/BuilderGridType";

type OwnPropsType = CommonDecoratorInjectType & {
    editing?: boolean,
    bc: Object,
    pageStore: PageModelType,
};

type PropsStoreType = {|
    store: FieldItemSelectorModelType,
|};

type PropsType = PropsStoreType & OwnPropsType;

type StateType = {|
    ComponentFieldFrom: ?React.ComponentType<*>,
    ComponentFieldTo: ?React.ComponentType<*>,
    hasError: boolean,
|};

const logger = loggerRoot.extend("FieldItemSelector");

export class FieldItemSelectorBase extends React.Component<PropsType, StateType> {
    buttonsConfig: Array<Object>;

    // eslint-disable-next-line max-lines-per-function
    constructor(props: PropsType) {
        super(props);

        const {bc, store} = this.props;
        const ComponentFieldFrom = getComponent(store.fieldFrom.type, store.fieldFrom.customid);
        const ComponentFieldTo = getComponent(store.fieldTo.type, store.fieldTo.customid);
        const hasError = !ComponentFieldFrom || !ComponentFieldTo;

        if (hasError) {
            logger("fieldFrom or fieldTo not found!");
        }

        this.state = {
            ComponentFieldFrom,
            ComponentFieldTo,
            hasError,
        };

        this.buttonsConfig = [
            {
                [VAR_RECORD_DISPLAYED]: "static:d78431bbcb484da4b516bc00626965ba",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-add-all`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: "addAll",
                iconfont: "fa-angle-double-right",
                iconfontname: "fa",
                onlyicon: "true",
                type: "BTN",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:833289fd818f4340b584beb9068f670b",
                [VAR_RECORD_MASTER_ID]: store.fieldFrom[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-add-selected`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: "addSelected",
                iconfont: "fa-angle-right",
                iconfontname: "fa",
                onlyicon: "true",
                type: "BTN",
                uitype: "1",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:67677d8e457c409daaef5fe5b90ec491",
                [VAR_RECORD_MASTER_ID]: store.fieldTo[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-selected`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: "removeSelected",
                iconfont: "fa-angle-left",
                iconfontname: "fa",
                onlyicon: "true",
                type: "BTN",
                uitype: "1",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:c4684efb2ea444f4b9192db3c4b4b843",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-all`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: "removeAll",
                iconfont: "fa-angle-double-left",
                iconfontname: "fa",
                onlyicon: "true",
                type: "BTN",
                uitype: "1",
            },
        ];
    }

    disposers = [];

    prevRecords = [];

    componentDidMount() {
        const {bc, store} = this.props;
        const [fromStore, toStore] = this.props.store.getStores({fieldFrom: store.fieldFrom, fieldTo: store.fieldTo});

        if (fromStore && toStore) {
            this.disposers.push(
                reaction(
                    () => fromStore.recordsStore.recordsAll,
                    () => {
                        if (toStore.recordsStore.isLoading) {
                            fromStore.recordsStore.setRecordsAction(this.prevRecords);
                            this.prevRecords = fromStore.recordsStore.records;
                        } else {
                            fromStore.recordsStore.removeRecordsAction(toStore.recordsStore.records, bc.column, true);
                        }
                    },
                ),
                reaction(
                    () => toStore.recordsStore.recordsAll,
                    () => {
                        fromStore.recordsStore.removeRecordsAction(toStore.recordsStore.records, bc.column, true);
                    },
                ),
            );
        }
    }

    componentWillUnmount() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
        this.prevRecords = [];
    }

    checkDisabled = (gridBc: BuilderGridType) => {
        const {pageStore} = this.props;
        const gridStore: ?GridModelType = pageStore.stores.get(gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (!gridStore) {
            return false;
        }

        return gridBc.selmode === "MULTI" || gridBc.selmode === "SIMPLE"
            ? gridStore.selectedRecords.size === 0
            : !gridStore.recordsStore.selectedRecord;
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {ComponentFieldFrom, ComponentFieldTo, hasError} = this.state;
        const {bc, editing, disabled, pageStore, visible, store} = this.props;
        const [btnAddAll, btnAddSelected, btnRemoveSelected, btnRemoveAll] = this.buttonsConfig;

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
                                    disabled={disabled || this.checkDisabled(store.fieldFrom)}
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
                                    disabled={disabled || this.checkDisabled(store.fieldTo)}
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
    }
}

const FieldItemSelector = compose(
    withModelDecorator(
        (bc: Object, {pageStore}: OwnPropsType): FieldItemSelectorModelType =>
            new FieldItemSelectorModel({bc, pageStore}),
    ),
    commonDecorator,
    observer,
)(FieldItemSelectorBase);

setComponent("ITEMSELECTOR", FieldItemSelector);

export default FieldItemSelector;
