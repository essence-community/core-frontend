// @flow
import * as React from "react";
import {Grid, Dialog, Button, DialogContent} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {Icon, Scrollbars, IPageModel, CARRY_LINES_REGEXP} from "@essence/essence-constructor-share";
import {useTranslation} from "@essence/essence-constructor-share/utils";
import {useStyles} from "./PagerWindowMessage.styles";

export const prepareTip = (tip: string): Array<string> => tip.split(CARRY_LINES_REGEXP);

interface IPagerWindowMessageProps {
    pageStore: IPageModel;
}

export const PagerWindowMessage: React.FC<IPagerWindowMessageProps> = (props) => {
    const classes = useStyles({});
    const {pageStore} = props;
    const [trans] = useTranslation("meta");

    return useObserver(() => (
        <Dialog
            open={pageStore.showQuestionWindow}
            container={pageStore.pageEl}
            maxWidth="md"
            classes={{
                paper: classes.rootDialog,
                paperWidthMd: classes.rootDialogWidthMd,
            }}
            style={{position: "absolute"}}
            hideBackdrop
        >
            <DialogContent className={classes.rootContent}>
                <Grid container alignItems="center" spacing={2} wrap="nowrap">
                    <Grid item>
                        <Icon iconfont="question-circle" size="2x" color="grey" />
                    </Grid>
                    <Grid item className={classes.content} xs zeroMinWidth>
                        <Scrollbars autoHeight autoHeightMax={180} pageStore={pageStore}>
                            <div>{pageStore.questionWindow ? prepareTip(pageStore.questionWindow) : ""}</div>
                            <div>{trans("5a33b10058114ae7876067447fde8242")}</div>
                        </Scrollbars>
                    </Grid>
                </Grid>
            </DialogContent>
            <div className={classes.rootActions}>
                <Grid container justify="flex-end" spacing={1}>
                    <Grid item>
                        <Button
                            onClick={pageStore.handleQuestionAccept}
                            color="primary"
                            variant="contained"
                            disableRipple
                            disableFocusRipple
                            data-page-object="pager-qustion-window-accept"
                            autoFocus
                        >
                            {trans("dacf7ab025c344cb81b700cfcc50e403")}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={pageStore.handleQuestionDecline}
                            color="secondary"
                            variant="contained"
                            disableRipple
                            disableFocusRipple
                            data-page-object="pager-qustion-window-decline"
                        >
                            {trans("f0e9877df106481eb257c2c04f8eb039")}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    ));
};
