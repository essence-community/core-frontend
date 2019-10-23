// @flow
import * as React from "react";
import {observer} from "mobx-react";
import noop from "lodash/noop";
import orderBy from "lodash/orderBy";
import {Grid} from "@material-ui/core";
import BuilderButtonCollector from "../../Button/BuilderButtonCollector/BuilderButtonCollector";
import Pagination from "../../Pagination/Pagination";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {styleTheme} from "../../constants";
import GridAudit from "../GridComponents/GridAudit";
import GridSettings from "../GridComponents/GridSettings";
import {type BuilderGridType} from "../BuilderGridType";

type PropsType = {|
    disabled?: boolean,
    readOnly?: boolean,
    bc: BuilderGridType,
    classes: Object,
    store: GridModelType,
    pageStore: PageModelType,
    visible: boolean,
    isInlineEditing: boolean,
|};

class GridBaseButtons extends React.Component<PropsType> {
    activeElement: ?HTMLElement = null;

    getSnapshotBeforeUpdate(prevProps) {
        if (!prevProps.isInlineEditing && this.props.isInlineEditing) {
            this.activeElement = document.activeElement;
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isInlineEditing && !this.props.isInlineEditing) {
            this.restoreFocusElement();
        }
    }

    restoreFocusElement = () => {
        if (this.activeElement) {
            this.activeElement.focus();

            this.activeElement = null;
        }
    };

    renderGridAuditButton = (buttonProps: Object) => ({onOpen}) => {
        const {disabled, store, pageStore} = this.props;
        const {overrides} = store.gridBtnsConfig;

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

    // eslint-disable-next-line max-statements
    getGridButtons = ({buttonProps, handleClose, isCollect = true}: Object) => {
        const {disabled, bc, store, pageStore} = this.props;
        const {overrides} = store.gridBtnsConfig;
        const {btnaudit, btnexcel, btnsettings} = bc;
        const btns = [];

        if (btnsettings === "true") {
            btns.push({
                component: (
                    <GridSettings
                        pageStore={pageStore}
                        buttonProps={buttonProps}
                        gridStore={store}
                        onClose={handleClose}
                    />
                ),
                key: "grid-setting",
                order: 10100,
            });
        }

        if (btnaudit === "true") {
            btns.push({
                component: (
                    <GridAudit
                        parentStore={store}
                        bc={overrides["Override Audit Button"]}
                        pageStore={pageStore}
                        onClose={handleClose}
                        isCollect={isCollect}
                    >
                        {this.renderGridAuditButton(buttonProps)}
                    </GridAudit>
                ),
                key: "grid-audit",
                order: overrides["Override Audit Button"].cnOrder,
            });
        }

        if (btnexcel === "true") {
            btns.push({
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Excel Button"]}
                        disabled={disabled}
                        color="inherit"
                        pageStore={pageStore}
                        onClick={handleClose}
                        {...buttonProps}
                    />
                ),
                key: "grid-excel",
                order: overrides["Override Excel Button"].cnOrder,
            });
        }

        return btns;
    };

    renderGridButtons = (props: Object): Array<React.Node> => {
        const btns = this.getGridButtons(props);

        return orderBy(btns, "order").map((options) => (
            <Grid item key={options.key}>
                {options.component}
            </Grid>
        ));
    };

    // eslint-disable-next-line max-statements
    render() {
        const {disabled, bc, store, classes, readOnly, pageStore, visible, isInlineEditing} = this.props;
        const {overrides, btns, btnsCollector} = store.gridBtnsConfig;
        const {btndelete, btnrefresh} = bc;
        const {recordsStore} = store;
        const {selectedRecord, pageSize} = recordsStore;
        const onlyIcon = styleTheme === "dark" ? true : undefined;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");
        const btnsAll = [
            ...btns.map((btn) => {
                const isAddButton =
                    btn.mode === "1" || btn.handler === "onCreateChildWindowMaster" || btn.handler === "onSimpleAddRow";

                return {
                    component: (
                        <BuilderMobxButton
                            onlyicon={onlyIcon}
                            bc={btn}
                            disabled={disabled}
                            variant={isAddButton ? "fab" : undefined}
                            readOnly={readOnly}
                            color={isAddButton ? undefined : "inherit"}
                            pageStore={pageStore}
                            visible={visible}
                            preventFocus={false}
                        />
                    ),
                    key: btn.ckPageObject,
                    order: btn.cnOrder,
                };
            }),
        ];

        if (btndelete === "true") {
            btnsAll.push({
                component: (
                    <BuilderMobxButton
                        bc={overrides["Override Delete Button"]}
                        color="inherit"
                        disabled={disabled}
                        readOnly={readOnly}
                        record={selectedRecord}
                        pageStore={pageStore}
                        visible={visible}
                    />
                ),
                key: overrides["Override Delete Button"].ckPageObject,
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
                key: overrides["Override Refresh Button"].ckPageObject,
                order: overrides["Override Refresh Button"].cnOrder,
            });
        }

        if (showStaticBtns) {
            btnsAll.push(...this.getGridButtons({isCollect: false}));
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
                            renderGridButtons={this.renderGridButtons}
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
                spacing={1}
                alignItems="center"
                direction={styleTheme === "light" ? "row" : "column"}
                className={isInlineEditing ? "hidden" : undefined}
            >
                {orderBy(btnsAll, "order").map((options) => (
                    <Grid item key={options.key}>
                        {options.component}
                    </Grid>
                ))}

                {pageSize && styleTheme === "light" ? (
                    <Grid item xs>
                        <Pagination
                            disabled={disabled}
                            classes={{root: classes.pagination}}
                            component="div"
                            count={recordsStore.recordsCount}
                            rowsPerPage={pageSize}
                            rowsPerPageOptions={[pageSize]}
                            page={recordsStore.pageNumber}
                            onChangePage={recordsStore.setPageNumberAction}
                            onChangeRowsPerPage={noop}
                            gridBc={bc}
                            visible={visible}
                        />
                    </Grid>
                ) : null}
            </Grid>
        );
    }
}

export default observer(GridBaseButtons);
