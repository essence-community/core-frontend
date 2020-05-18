import * as React from "react";
import {Grid, Dialog, Button, DialogContent} from "@material-ui/core";
import {IPageModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useStyles} from "./WindowCancel.styles";

interface IWindowCancelProps {
    pageStore: IPageModel;
    isOpen: boolean;
    bc: IBuilderConfig;
    onAccept: () => void;
    onDecline: () => void;
}

export const WindowCancel: React.FC<IWindowCancelProps> = (props) => {
    const {pageStore, isOpen, bc, onAccept, onDecline} = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");

    return (
        <Dialog
            open={isOpen}
            container={pageStore.pageEl}
            maxWidth="sm"
            classes={{
                paper: classes.rootDialog,
                paperWidthMd: classes.rootDialogWidthMd,
                paperWidthSm: classes.rootDialogWidthSm,
            }}
            style={{position: "absolute"}}
            hideBackdrop={false}
        >
            <DialogContent className={classes.rootContent}>
                <Grid container alignItems="center" spacing={2} wrap="nowrap">
                    <Grid item>
                        <Icon iconfont="question-circle" size="2x" color="grey" />
                    </Grid>
                    <Grid item className={classes.content} xs zeroMinWidth>
                        <Scrollbars autoHeight autoHeightMax={180} pageStore={pageStore}>
                            {trans("static:9b475e25ae8a40b0b158543b84ba8c08")}
                        </Scrollbars>
                    </Grid>
                </Grid>
            </DialogContent>
            <div className={classes.rootActions}>
                <Grid container justify="flex-end" spacing={1}>
                    <Grid item>
                        <Button
                            onClick={onAccept}
                            color="primary"
                            variant="contained"
                            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-accept`}
                            autoFocus
                        >
                            {trans("static:dacf7ab025c344cb81b700cfcc50e403")}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={onDecline}
                            color="secondary"
                            variant="contained"
                            disableRipple
                            disableFocusRipple
                            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-decline`}
                        >
                            {trans("static:f0e9877df106481eb257c2c04f8eb039")}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
};
