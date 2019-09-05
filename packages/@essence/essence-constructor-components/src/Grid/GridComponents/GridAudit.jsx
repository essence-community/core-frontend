// @flow

import * as React from "react";
import {observer} from "mobx-react";
import {compose} from "recompose";
import moment from "moment";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent";
import {styleTheme} from "../../constants";
import Popover from "../../Popover/Popover";
import {type PopoverRenderChildren} from "../../Popover/PopoverTypes";
import withModelDecorator from "../../decorators/withModelDecorator";
import {AuditModel, type AuditModelType} from "../../stores/AuditModel";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type HistoryModelType} from "../../stores/HistoryModel";

type PropsType = {|
    parentStore: GridModelType | HistoryModelType,
    bc: Object,
    pageStore: PageModelType,
    disabled?: boolean,
    hidden?: boolean,
    isCollect?: boolean,
    children: PopoverRenderChildren,
    onClose?: () => void,
|};

type PropsStoreType = {
    store: AuditModelType,
};

const ANCHOR_ORIGIN = {
    horizontal: "right",
    vertical: "top",
};
const TRANSFORM_ORIGIN = {
    horizontal: "left",
    vertical: "top",
};

class GridAudit extends React.Component<PropsType & PropsStoreType> {
    handleChangeOpen = (isAuditOpen: boolean) => {
        const {store, parentStore, onClose} = this.props;

        if (isAuditOpen) {
            store.loadAuditInfoAction(parentStore.recordsStore.selectedRecord);
        } else if (onClose) {
            onClose();
        }
    };

    render() {
        const {
            store: {auditInfo},
            children,
            pageStore,
            bc,
        } = this.props;

        const popoverContent = (
            <CardContent>
                <Typography>Изменен: {moment(auditInfo.ctChange).format("DD.MM.YYYY HH:mm:ss")}</Typography>
                <Typography>Пользователь: {auditInfo.cvUsername}</Typography>
            </CardContent>
        );

        return (
            <Popover
                popoverContent={popoverContent}
                container={pageStore.pageEl}
                onChangeOpen={this.handleChangeOpen}
                dataPageObjectPopover={`${bc.ckPageObject}-window`}
                width="auto"
                pageStore={pageStore}
                hideOnScroll
                transformOrigin={styleTheme === "dark" ? TRANSFORM_ORIGIN : undefined}
                anchorOrigin={styleTheme === "dark" ? ANCHOR_ORIGIN : undefined}
            >
                {children}
            </Popover>
        );
    }
}

export default compose(
    withModelDecorator((bc: Object, {pageStore}: PropsType): AuditModelType => new AuditModel({bc, pageStore})),
    observer,
)(GridAudit);
