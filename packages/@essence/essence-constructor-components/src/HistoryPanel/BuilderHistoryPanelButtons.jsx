// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import orderBy from "lodash/orderBy";
import {mapComponents} from "@essence/essence-constructor-share";
import {buttonDirection, styleTheme} from "../constants";
import GridAudit from "../Grid/GridComponents/GridAudit";
import BuilderMobxButton from "../Button/BuilderMobxButton";
import BuilderButtonCollector from "../Button/BuilderButtonCollector/BuilderButtonCollector";
import {type HistoryModelType} from "../stores/HistoryModel";
import {type PageModelType} from "../stores/PageModel";
import {type BuilderHistoryPanelType} from "./BuilderHistoryPanelType";

type PropsType = {
    disabled?: boolean,
    readOnly?: boolean,
    store: HistoryModelType,
    bc: BuilderHistoryPanelType,
    pageStore: PageModelType,
    visible: boolean,
    editing: boolean,
};

class BuilderHistoryPanelButtons extends React.Component<PropsType> {
    activeElement: ?HTMLElement = null;

    getSnapshotBeforeUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.activeElement = document.activeElement;
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editing && !this.props.editing) {
            this.restoreFocusElement();
        }
    }

    componentWillUnmount() {
        this.activeElement = null;
    }

    restoreFocusElement = () => {
        if (this.activeElement) {
            this.activeElement.focus();

            this.activeElement = null;
        }
    };

    renderGridAuditButton = (buttonProps: Object) => ({onOpen}) => {
        const {disabled, pageStore, store} = this.props;
        const {overrides} = store.btnsConfig;

        return (
            <BuilderMobxButton
                bc={overrides["Override Audit Button"]}
                disabled={disabled}
                color="inherit"
                pageStore={pageStore}
                handleClick={onOpen}
                {...buttonProps}
            />
        );
    };

    getStaticButtons = ({buttonProps, handleClose}: Object) => {
        const {bc, store, pageStore} = this.props;
        const {overrides} = store.btnsConfig;
        const {btnaudit} = bc;
        const btns = [];

        if (btnaudit === "true") {
            btns.push({
                component: (
                    <GridAudit
                        parentStore={store}
                        bc={overrides["Override Audit Button"]}
                        pageStore={pageStore}
                        onClose={handleClose}
                    >
                        {this.renderGridAuditButton(buttonProps)}
                    </GridAudit>
                ),
                key: "grid-audit",
                order: overrides["Override Audit Button"],
            });
        }

        return btns;
    };

    renderStaticButtons = ({buttonProps, handleClose}: Object): Array<React.Node> => {
        const {bc, store, pageStore} = this.props;
        const {overrides} = store.btnsConfig;
        const {btnaudit} = bc;
        const btns = [];

        if (btnaudit === "true") {
            btns.push(
                <GridAudit
                    parentStore={store}
                    bc={overrides["Override Audit Button"]}
                    key="grid-audit"
                    pageStore={pageStore}
                    onClose={handleClose}
                >
                    {this.renderGridAuditButton(buttonProps)}
                </GridAudit>,
            );
        }

        return btns;
    };

    // eslint-disable-next-line max-statements
    render() {
        const {disabled, store, readOnly, pageStore, editing, visible, bc} = this.props;
        const {btnrefresh, btndelete} = bc;
        const {btns, btnsCollector, overrides} = store.btnsConfig;
        const {records, selectedRecordIndex} = store.recordsStore;
        const onlyIcon = styleTheme === "dark" ? true : undefined;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");

        const btnsAll = [
            {
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Add Button"]}
                        disabled={disabled}
                        readOnly={readOnly}
                        variant="fab"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Add Button",
                order: overrides["Override Add Button"].cnOrder,
            },
            {
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Edit Button"]}
                        disabled={disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0}
                        readOnly={readOnly}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Edit Button",
                order: overrides["Override Edit Button"].cnOrder,
            },
            {
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Clone Button"]}
                        disabled={disabled || selectedRecordIndex === -1}
                        readOnly={readOnly}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Clone Button",
                order: overrides["Override Clone Button"].cnOrder,
            },
        ];

        if (btndelete === "true") {
            btnsAll.push({
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Delete Button"]}
                        disabled={disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0}
                        readOnly={readOnly}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Delete Button",
                order: overrides["Override Delete Button"].cnOrder,
            });
        }

        if (btnrefresh === "true") {
            btnsAll.push({
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Refresh Button"]}
                        disabled={disabled}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Refresh Button",
                order: overrides["Override Refresh Button"].cnOrder,
            });
        }

        btnsAll.push(
            {
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Left Button"]}
                        disabled={disabled || records.length === 0 || selectedRecordIndex === records.length - 1}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Left Button",
                order: overrides["Override Left Button"].cnOrder,
            },
            {
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Right Button"]}
                        disabled={disabled || selectedRecordIndex <= 0}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: "Right Button",
                order: overrides["Override Right Button"].cnOrder,
            },
        );

        mapComponents(btns, (ChildComponent, childBc) => {
            btnsAll.push({
                component: (
                    <ChildComponent
                        bc={childBc}
                        disabled={disabled}
                        readOnly={readOnly}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: childBc.ckPageObject,
                order: childBc.cnOrder,
            });
        });

        if (showStaticBtns) {
            this.renderStaticButtons({}).map((btn, index) => (
                <Grid item key={index}>
                    {btn}
                </Grid>
            ));
        }

        if (btnsCollector) {
            btnsCollector.forEach((btn) => {
                btnsAll.push({
                    component: (
                        <BuilderButtonCollector
                            onlyicon={onlyIcon}
                            bc={btn}
                            disabled={disabled}
                            readOnly={readOnly}
                            color="inherit"
                            renderGridButtons={this.renderStaticButtons}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ),
                    key: btn.ckPageObject,
                    order: btn.cnOrder,
                });
            });
        }

        return (
            <Grid
                container
                alignItems="center"
                spacing={1}
                direction={buttonDirection}
                className={editing ? "hidden" : undefined}
            >
                {orderBy(btnsAll, "order").map((btn) => (
                    <Grid item key={btn.key}>
                        {btn.component}
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default observer(BuilderHistoryPanelButtons);
