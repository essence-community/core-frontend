// @flow

import * as React from "react";
import {observer} from "mobx-react";
import {compose} from "recompose";
import moment from "moment";
import {Typography, CardContent} from "@material-ui/core";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CT_CHANGE,
    VAR_RECORD_CV_USERNAME,
} from "@essence/essence-constructor-share/constants";
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

class GridAudit extends React.Component<PropsType & PropsStoreType & WithT> {
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
            // eslint-disable-next-line id-length
            t,
        } = this.props;

        const popoverContent = (
            <CardContent>
                <Typography variant="body2">
                    {t("a51733f718974db891606a516a906d4a")}:{" "}
                    {moment(auditInfo[VAR_RECORD_CT_CHANGE]).format("DD.MM.YYYY HH:mm:ss")}
                </Typography>
                <Typography variant="body2">
                    {t("359b72856d284d1baf5ff9e14e8293c9")}: {auditInfo[VAR_RECORD_CV_USERNAME]}
                </Typography>
            </CardContent>
        );

        return (
            <Popover
                popoverContent={popoverContent}
                container={pageStore.pageEl}
                onChangeOpen={this.handleChangeOpen}
                dataPageObjectPopover={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-window`}
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
    withTranslation("meta"),
    observer,
)(GridAudit);
