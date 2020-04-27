import * as React from "react";
import {DialogContent, Grid, Button} from "@material-ui/core";
import {IPageModel} from "../../types";
import {Icon} from "../../Icon";
import {Scrollbars} from "../Scrollbars";
import {useTranslation} from "../../utils";
import {useStyles} from "./Confirm.styles";

type StatusType = "warning" | "error" | "info";

const statusIcons = {
    error: "question-circle",
    info: "question-circle",
    warning: "question-circle",
};

interface IWindowMessageProps {
    status?: StatusType;
    textAccept?: string;
    textDecline?: string;
    pageStore: IPageModel;
    ckPageObject: string;
    onAccept: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    onDecline: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const Confirm: React.FC<IWindowMessageProps> = (props) => {
    const {
        children = "static:9b475e25ae8a40b0b158543b84ba8c08",
        textAccept = "static:dacf7ab025c344cb81b700cfcc50e403",
        textDecline = "static:f0e9877df106481eb257c2c04f8eb039",
        onAccept,
        onDecline,
        status = "info",
        pageStore,
        ckPageObject,
    } = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");

    return (
        <>
            <DialogContent className={classes.rootContent}>
                <Grid container alignItems="center" spacing={2} wrap="nowrap">
                    <Grid item>
                        <Icon iconfont={statusIcons[status]} size="2x" color="grey" />
                    </Grid>
                    <Grid item className={classes.content} xs zeroMinWidth>
                        <Scrollbars autoHeight autoHeightMax={180} pageStore={pageStore}>
                            {typeof children === "string" ? trans(children) : children}
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
                            disableRipple
                            disableFocusRipple
                            data-page-object={`${ckPageObject}-accept`}
                            autoFocus
                        >
                            {trans(textAccept)}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={onDecline}
                            color="secondary"
                            variant="contained"
                            disableRipple
                            disableFocusRipple
                            data-page-object={`${ckPageObject}-decline`}
                        >
                            {trans(textDecline)}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
