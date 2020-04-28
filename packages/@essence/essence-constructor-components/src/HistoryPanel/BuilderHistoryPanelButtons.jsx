// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import orderBy from "lodash/orderBy";
import {mapComponents} from "@essence-community/constructor-share/components";
import {EditorContex} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_CN_ORDER} from "@essence-community/constructor-share/constants";
import {buttonDirection, styleTheme} from "../constants";
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
    static contextType = EditorContex;

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

    getStaticButtons = () => {
        const {bc, store} = this.props;
        const {overrides} = store.btnsConfig;
        const {btnaudit} = bc;
        const btns = [];

        if (btnaudit === "true") {
            btns.push({
                bc: overrides["Override Audit Button"],
                order: overrides["Override Audit Button"][VAR_RECORD_CN_ORDER],
            });
        }

        return btns;
    };

    handlePerformData = () => {
        const {form} = this.context;

        return {form};
    };

    // eslint-disable-next-line max-statements, max-lines-per-function, complexity
    render() {
        const {disabled, store, readOnly, pageStore, editing, visible, bc} = this.props;
        const {btnrefresh, btndelete} = bc;
        const {btns, btnsCollector, overrides} = store.btnsConfig;
        const {records, selectedRecordIndex} = store.recordsStore;
        const onlyIcon = styleTheme === "dark" ? true : undefined;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");
        const staticAll = this.getStaticButtons();

        const btnsAll = [
            {
                bc: overrides["Override Add Button"],
                disabled,
                order: overrides["Override Add Button"][VAR_RECORD_CN_ORDER],
            },
            {
                bc: overrides["Override Edit Button"],
                disabled: disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0,
                order: overrides["Override Edit Button"][VAR_RECORD_CN_ORDER],
            },
            {
                bc: overrides["Override Clone Button"],
                disabled: disabled || selectedRecordIndex === -1,
                order: overrides["Override Clone Button"][VAR_RECORD_CN_ORDER],
            },
        ];

        if (btndelete === "true") {
            btnsAll.push({
                bc: overrides["Override Delete Button"],
                disabled: disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0,
                order: overrides["Override Delete Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (btnrefresh === "true") {
            btnsAll.push({
                bc: overrides["Override Refresh Button"],
                disabled,
                order: overrides["Override Refresh Button"][VAR_RECORD_CN_ORDER],
            });
        }

        btnsAll.push(
            {
                bc: overrides["Override Left Button"],
                disabled: disabled || records.length === 0 || selectedRecordIndex === records.length - 1,
                order: overrides["Override Left Button"][VAR_RECORD_CN_ORDER],
            },
            {
                bc: overrides["Override Right Button"],
                disabled: disabled || selectedRecordIndex <= 0,
                order: overrides["Override Right Button"][VAR_RECORD_CN_ORDER],
            },
        );

        btns.forEach((btn) => {
            btnsAll.push({
                bc: onlyIcon ? {...btn, onlyicon: "true"} : btn,
                disabled,
                order: btn[VAR_RECORD_CN_ORDER],
            });
        });

        if (showStaticBtns) {
            btnsAll.push(...staticAll);
        }

        if (btnsCollector) {
            btnsCollector.forEach((btn) => {
                btnsAll.push({
                    bc: {
                        ...btn,
                        onlyicon: onlyIcon ? "true" : btn.onlyicon,
                        topbtn: btn.topbtn ? [...btn.topbtn, ...staticAll] : staticAll,
                    },
                    disabled,
                    key: btn[VAR_RECORD_PAGE_OBJECT_ID],
                    order: btn[VAR_RECORD_CN_ORDER],
                });
            });
        }

        const orderedBtns = orderBy(btnsAll, "order");

        return (
            <Grid
                container
                alignItems="center"
                spacing={1}
                direction={buttonDirection}
                className={editing ? "hidden" : undefined}
            >
                {mapComponents(
                    orderedBtns.map((config) => config.bc),
                    (ChildCmp, childBc, index) => (
                        <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                            <ChildCmp
                                bc={childBc}
                                disabled={orderedBtns[index].disabled}
                                readOnly={readOnly}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    ),
                )}
            </Grid>
        );
    }
}

export default observer(BuilderHistoryPanelButtons);
