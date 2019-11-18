// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {ButtonBase, Grid} from "@material-ui/core";
import cn from "classnames";
import {SnackbarContentText} from "@essence/essence-constructor-components";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";

type PropsType = WithT & {|
    classes: {
        notificationContent: string,
        notificationContentData: string,
        notificationHeader: string,
        notificationRoot: string,
        dot: string,
        clearButton: string,
        pageName: string,
    },
    snackbar: Object,
    snackbarStore: Object,
|};

const statusesRead = (trans: any): IFileStatus => {
    return {
        errorUpload: trans("73de7f460cc04bc8a068429d66e684ce"),
        progress: trans("ad39828554114893872302a0aaa031af"),
        uploaded: trans("5454b0c6f64b41daab8deb88f948a4f1"),
    };
};

class Notification extends React.Component<PropsType> {
    handleDelete = () => {
        const {snackbarStore, snackbar} = this.props;

        snackbarStore.deleteSnackbarAction(snackbar.id);
    };

    handleRead = () => {
        const {snackbarStore, snackbar} = this.props;

        snackbarStore.readSnackbarAction(snackbar.id);
    };

    render() {
        const {classes = {}, snackbar} = this.props;
        const statuses = statusesRead(this.props.t);

        return (
            <div
                className={classes.notificationRoot}
                onMouseEnter={snackbar.read === false ? this.handleRead : undefined}
            >
                {snackbar.read === false ? <span className={classes.dot} /> : null}
                <Grid container wrap="nowrap" justify="space-between" className={classes.notificationHeader}>
                    <Grid item data-qtip={snackbar.createdAt} style={{paddingRight: 10}}>
                        {snackbar.createdAt}
                    </Grid>
                    {snackbar.status && statuses[snackbar.status] ? (
                        <Grid item data-qtip={snackbar.createdAt} style={{paddingRight: 10}}>
                            {statuses[snackbar.status]}
                        </Grid>
                    ) : null}
                    <Grid item className={classes.pageName} data-qtip={snackbar.pageName}>
                        {snackbar.pageName}
                    </Grid>
                    <Grid item>
                        <ButtonBase
                            onClick={this.handleDelete}
                            className={classes.clearButton}
                            disableRipple
                            data-qtip={this.props.t("f7e324760ede4c88b4f11f0af26c9e97")}
                            data-page-object={`snackbar-remove-${snackbar.id}`}
                        >
                            <Icon iconfont="times" iconfontname="fa" size="1x" />
                        </ButtonBase>
                    </Grid>
                </Grid>
                <div className={cn(classes.notificationContent, classes.notificationContentData)}>
                    <SnackbarContentText
                        text={snackbar.text}
                        title={snackbar.title}
                        description={snackbar.description}
                        code={snackbar.code}
                    />
                </div>
            </div>
        );
    }
}

export default withTranslation("meta")(observer(Notification));
