// @flow
import * as React from "react";
import {observer} from "mobx-react";
import noop from "lodash/noop";
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
    renderGridButtons = ({buttonProps, handleClose, isCollect = true}: Object): Array<React.Node> => {
        const {disabled, bc, store, pageStore} = this.props;
        const {overrides} = store.gridBtnsConfig;
        const {btnaudit, btnexcel, btnsettings} = bc;
        const btns = [];

        if (btnsettings === "true") {
            btns.push(
                <Grid item key="grid-setting">
                    <GridSettings
                        pageStore={pageStore}
                        buttonProps={buttonProps}
                        gridStore={store}
                        onClose={handleClose}
                    />
                </Grid>,
            );
        }

        if (btnaudit === "true") {
            btns.push(
                <GridAudit
                    parentStore={store}
                    bc={overrides["Override Audit Button"]}
                    key="grid-audit"
                    pageStore={pageStore}
                    onClose={handleClose}
                    isCollect={isCollect}
                >
                    {this.renderGridAuditButton(buttonProps)}
                </GridAudit>,
            );
        }

        if (btnexcel === "true") {
            btns.push(
                <Grid item key="grid-excel">
                    <BuilderMobxButton
                        bc={overrides["Override Excel Button"]}
                        disabled={disabled}
                        color="inherit"
                        pageStore={pageStore}
                        onClick={handleClose}
                        {...buttonProps}
                    />
                </Grid>,
            );
        }

        return btns;
    };

    render() {
        const {disabled, bc, store, classes, readOnly, pageStore, visible, isInlineEditing} = this.props;
        const {overrides, btns, btnsCollector} = store.gridBtnsConfig;
        const {btndelete, btnrefresh} = bc;
        const {recordsStore} = store;
        const {selectedRecord, pageSize} = recordsStore;
        const onlyIcon = styleTheme === "dark" ? true : undefined;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");

        return (
            <Grid
                container
                spacing={1}
                alignItems="center"
                direction={styleTheme === "light" ? "row" : "column"}
                className={isInlineEditing ? "hidden" : undefined}
            >
                {btns.map((btn) => {
                    const isAddButton =
                        btn.mode === "1" ||
                        btn.handler === "onCreateChildWindowMaster" ||
                        btn.handler === "onSimpleAddRow";

                    return (
                        <Grid item key={btn.ckPageObject}>
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
                        </Grid>
                    );
                })}

                {btndelete === "true" ? (
                    <Grid item>
                        <BuilderMobxButton
                            bc={overrides["Override Delete Button"]}
                            color="inherit"
                            disabled={disabled}
                            readOnly={readOnly}
                            record={selectedRecord}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    </Grid>
                ) : null}

                {btnrefresh === "true" ? (
                    <Grid item>
                        <BuilderMobxButton
                            bc={overrides["Override Refresh Button"]}
                            disabled={disabled}
                            color="inherit"
                            pageStore={pageStore}
                            visible={visible}
                        />
                    </Grid>
                ) : null}

                {showStaticBtns
                    ? this.renderGridButtons({isCollect: false}).map((btn, index) => (
                          <Grid item key={index}>
                              {btn}
                          </Grid>
                      ))
                    : null}

                {btnsCollector
                    ? btnsCollector.map((btn) => (
                          <Grid item key={btn.ckPageObject}>
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
                          </Grid>
                      ))
                    : null}

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
