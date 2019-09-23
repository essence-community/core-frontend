/* eslint-disable no-inline-comments */
// @flow
import * as React from "react";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {Modal} from "@material-ui/core";
import {observer} from "mobx-react";
import {type PageModelType} from "../stores/PageModel";
import LineLoader from "../Components/Loaders/LineLoader";

const styles = (theme: Object) => ({
    root: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        zIndex: theme.zIndex.loader,
    },
});

type PropsType = {
    classes?: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
    pageStore?: PageModelType,
    container: ?HTMLDivElement,
    isLoading?: boolean,
    loaderType?: "default" | "bfl-loader",
};

const PageLoader = ({pageStore, container, classes = {}, isLoading, loaderType}: PropsType) => (
    <React.Fragment>
        <Modal
            open={Boolean(isLoading || (container && pageStore && pageStore.isLoading))}
            container={container}
            className={classes.root}
            hideBackdrop
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
        >
            <LineLoader loaderType={loaderType} size={100} />
        </Modal>
    </React.Fragment>
);

export default compose(
    withStyles(styles),
    observer,
)(PageLoader);
