// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction} from "mobx";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {toSize} from "@essence/essence-constructor-share/utils";
import {setComponent, getComponent} from "@essence/essence-constructor-share";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence/essence-constructor-share/constants";
import {loggerRoot} from "../constants";
import {type PageModelType} from "../stores/PageModel";
import {type GridModelType} from "../stores/GridModel";
import withModelDecorator from "../decorators/withModelDecorator";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {FieldItemSelectorModel, type FieldItemSelectorModelType} from "../stores/FieldItemSelectorModel";
import BuilderMobxButton from "../Button/BuilderMobxButton";
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
    fieldFrom: Object,
    fieldTo: Object,
    hasError: boolean,
|};

const logger = loggerRoot.extend("FieldItemSelector");

export class FieldItemSelectorBase extends React.Component<PropsType, StateType> {
    buttonsConfig: Array<Object>;

    // eslint-disable-next-line max-lines-per-function
    constructor(props: PropsType) {
        super(props);

        const {bc} = this.props;
        const [fieldFrom, fieldTo] = bc.childs;
        const ComponentFieldFrom = getComponent(fieldFrom.type, fieldFrom.customid);
        const ComponentFieldTo = getComponent(fieldTo.type, fieldTo.customid);
        const hasError = !ComponentFieldFrom || !ComponentFieldTo;

        if (hasError) {
            logger("fieldFrom or fieldTo not found!");
        }

        this.state = {
            ComponentFieldFrom,
            ComponentFieldTo,
            fieldFrom,
            fieldTo,
            hasError,
        };

        this.buttonsConfig = [
            {
                [VAR_RECORD_DISPLAYED]: "static:d78431bbcb484da4b516bc00626965ba",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-add-all`,
                handlerFn: this.addAll,
                iconfont: "fa-angle-double-right",
                iconfontname: "fa",
                onlyicon: "true",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:833289fd818f4340b584beb9068f670b",
                [VAR_RECORD_MASTER_ID]: fieldFrom[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-add-selected`,
                handlerFn: this.addSelected,
                iconfont: "fa-angle-right",
                iconfontname: "fa",
                onlyicon: "true",
                type: "BTN",
                uitype: "1",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:67677d8e457c409daaef5fe5b90ec491",
                [VAR_RECORD_MASTER_ID]: fieldTo[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-selected`,
                handlerFn: this.removeSelected,
                iconfont: "fa-angle-left",
                iconfontname: "fa",
                onlyicon: "true",
                type: "BTN",
                uitype: "1",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:c4684efb2ea444f4b9192db3c4b4b843",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-all`,
                handlerFn: this.removeAll,
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
        const {fieldFrom, fieldTo} = this.state;
        const {bc} = this.props;
        const [fromStore, toStore] = this.props.store.getStores({fieldFrom, fieldTo});

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

    addAll = () => {
        const {fieldFrom, fieldTo} = this.state;

        return this.props.store.moveRecSaveAction("1", {fieldFrom, fieldTo}, true);
    };

    addSelected = () => {
        const {fieldFrom, fieldTo} = this.state;

        return this.props.store.moveRecSaveAction("1", {fieldFrom, fieldTo}, false);
    };

    removeSelected = () => {
        const {fieldFrom, fieldTo} = this.state;

        return this.props.store.moveRecSaveAction("3", {fieldFrom: fieldTo, fieldTo: fieldFrom}, false);
    };

    removeAll = () => {
        const {fieldFrom, fieldTo} = this.state;

        return this.props.store.moveRecSaveAction("3", {fieldFrom: fieldTo, fieldTo: fieldFrom}, true);
    };

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
        const {bc, editing, disabled, pageStore, visible} = this.props;
        const [fieldFrom, fieldTo] = bc.childs;
        const baseStyle = {
            flexBasis: "0%",
            height: toSize(bc.height),
        };
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
                alignItems="center"
            >
                <Grid item xs zeroMinWidth style={baseStyle}>
                    {ComponentFieldFrom ? (
                        <ComponentFieldFrom
                            bc={fieldFrom}
                            editing={editing}
                            disabled={disabled}
                            autoHeightGrid={false}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ) : null}
                </Grid>
                <Grid item>
                    <Grid container spacing={0} direction="column" justify="center">
                        <Grid item>
                            <BuilderMobxButton
                                disabled={disabled}
                                bc={btnAddAll}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                        <Grid item>
                            <BuilderMobxButton
                                disabled={disabled || this.checkDisabled(fieldFrom)}
                                bc={btnAddSelected}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                        <Grid item>
                            <BuilderMobxButton
                                disabled={disabled || this.checkDisabled(fieldTo)}
                                bc={btnRemoveSelected}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                        <Grid item>
                            <BuilderMobxButton
                                disabled={disabled}
                                bc={btnRemoveAll}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs zeroMinWidth style={baseStyle}>
                    {ComponentFieldTo ? (
                        <ComponentFieldTo
                            bc={fieldTo}
                            editing={editing}
                            disabled={disabled}
                            autoHeightGrid={false}
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
