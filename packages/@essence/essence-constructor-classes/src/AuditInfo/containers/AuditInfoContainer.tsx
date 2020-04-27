import * as React from "react";
import moment from "moment";
import {IClassProps} from "@essence-community/constructor-share/types";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {CardContent, Typography, useTheme} from "@material-ui/core";
import {
    VAR_RECORD_CT_CHANGE,
    VAR_RECORD_CV_USERNAME,
    VAR_RECORD_PAGE_OBJECT_ID,
} from "@essence-community/constructor-share/constants";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import {useModel} from "@essence-community/constructor-share/hooks";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useObserver} from "mobx-react-lite";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {AuditInfoModel} from "../store/AuditInfoModel";
import {useStyles} from "./AuditInfoContainer.styles";

const ANCHOR_ORIGIN: IPopoverAnchorOrigin = {
    horizontal: "right",
    vertical: "top",
};
const TRANSFORM_ORIGIN: IPopoverTransfromOrigin = {
    horizontal: "left",
    vertical: "top",
};

export const AuditInfoContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const [store] = useModel((options) => new AuditInfoModel({...options, applicationStore: null}), props);
    const classes = useStyles();
    const theme = useTheme();
    const [trans] = useTranslation();
    const isDark = theme.palette.type === "dark";
    const btnBc = React.useMemo(() => ({...bc, handler: "onPopoverOpen", type: "BTN"}), [bc]);

    const handleChangeOpen = React.useCallback(
        (isAuditOpen: boolean) => {
            if (isAuditOpen) {
                store.loadAuditInfoAction(pageStore);
            }
        },
        [pageStore, store],
    );

    return useObserver(() => (
        <Popover
            popoverContent={
                <CardContent>
                    <Typography variant="body2">
                        {trans("static:a51733f718974db891606a516a906d4a")}:{" "}
                        {moment(store.auditInfo[VAR_RECORD_CT_CHANGE]).format("DD.MM.YYYY HH:mm:ss")}
                    </Typography>
                    <Typography variant="body2">
                        {trans("static:359b72856d284d1baf5ff9e14e8293c9")}: {store.auditInfo[VAR_RECORD_CV_USERNAME]}
                    </Typography>
                </CardContent>
            }
            className={classes.popover}
            container={pageStore.pageEl}
            onChangeOpen={handleChangeOpen}
            dataPageObjectPopover={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-window`}
            width="auto"
            pageStore={pageStore}
            hideOnScroll
            transformOrigin={isDark ? TRANSFORM_ORIGIN : undefined}
            anchorOrigin={isDark ? ANCHOR_ORIGIN : undefined}
        >
            {mapComponentOne(btnBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
        </Popover>
    ));
};
