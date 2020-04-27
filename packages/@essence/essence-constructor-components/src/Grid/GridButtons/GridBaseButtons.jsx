// @flow
import * as React from "react";
import {observer} from "mobx-react";
import noop from "lodash/noop";
import orderBy from "lodash/orderBy";
import {Grid} from "@material-ui/core";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CN_ORDER,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import Pagination from "../../Pagination/Pagination";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {styleTheme} from "../../constants";
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

    getGridButtons = () => {
        const {bc, store} = this.props;
        const {overrides} = store.gridBtnsConfig;
        const btns = [];

        if (bc.btnsettings === "true") {
            btns.push({
                bc: {
                    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_setting`,
                    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                    type: "GRID_SETTINGS",
                    uitype: "1",
                },
                order: 10100,
            });
        }

        if (bc.btnaudit === "true") {
            btns.push({
                bc: overrides["Override Audit Button"],
                order: overrides["Override Audit Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (bc.btnexcel === "true") {
            btns.push({
                bc: overrides["Override Excel Button"],
                order: overrides["Override Excel Button"][VAR_RECORD_CN_ORDER],
            });
        }

        return btns;
    };

    // eslint-disable-next-line  max-lines-per-function, max-statements
    render() {
        const {bc, store, classes, visible, isInlineEditing, readOnly, pageStore} = this.props;
        const disabled = this.props.disabled || isInlineEditing;
        const {overrides, btns, btnsCollector} = store.gridBtnsConfig;
        const {btndelete, btnrefresh} = bc;
        const {recordsStore} = store;
        const {pageSize} = recordsStore;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");
        const btnsAll = [
            ...btns.map((btn) => {
                const isAddButton =
                    btn.mode === "1" || btn.handler === "onCreateChildWindowMaster" || btn.handler === "onSimpleAddRow";

                return {
                    bc: isAddButton ? {...btn, uitype: "4"} : {...btn, uitype: btn.uitype === "1" ? "11" : btn.uitype},
                    order: btn[VAR_RECORD_CN_ORDER],
                };
            }),
        ];

        if (btndelete === "true") {
            btnsAll.push({
                bc: overrides["Override Delete Button"],
                order: overrides["Override Delete Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (btnrefresh === "true") {
            btnsAll.push({
                bc: overrides["Override Refresh Button"],
                order: overrides["Override Refresh Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (showStaticBtns) {
            btnsAll.push(...this.getGridButtons({isCollect: false}));
        } else if (btnsCollector) {
            const childBtns = orderBy(this.getGridButtons({isCollect: false}), "order").map((config) => ({
                ...config.bc,
                onlyicon: "false",
            }));

            btnsCollector.forEach((btn) => {
                btnsAll.push({
                    bc: {...btn, topbtn: btn.topbtn ? [...btn.topbtn, ...childBtns] : childBtns},
                    order: btn[VAR_RECORD_CN_ORDER],
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
                {mapComponents(
                    orderBy(btnsAll, "order").map((config) => config.bc),
                    (ChildCmp, childBc) => (
                        <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                            <ChildCmp
                                bc={childBc}
                                disabled={disabled}
                                readOnly={readOnly}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    ),
                )}

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
