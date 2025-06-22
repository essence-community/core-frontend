import * as React from "react";
import {Modal, DialogContent, Grid} from "@mui/material";
import {useObserver} from "mobx-react";
import {IPageModel} from "../../types";
import {LineLoader} from "../LineLoader";
import {useStyles} from "./PageLoader.styles";

interface IPagerLoaderProps {
    pageStore?: IPageModel;
    container: HTMLDivElement | null;
    isLoading?: boolean;
    loaderType?: "default" | "bfl-loader";
}

export const PageLoader: React.FC<IPagerLoaderProps> = (props) => {
    const {pageStore, container, isLoading, loaderType = "default"} = props;
    const classes = useStyles(props);

    return useObserver(() => (
        <React.Fragment>
            <Modal component="div" open={Boolean(isLoading || (container && pageStore && pageStore.isLoading))}
                style={{position: "absolute"}}
                container={container}
                className={classes.root}
                hideBackdrop
                disableAutoFocus
                disableEnforceFocus
                disableRestoreFocus
            >
                <DialogContent>
                    <Grid container justifyContent="center" alignItems="center">
                        <LineLoader loaderType={loaderType} size={100} />
                    </Grid>
                </DialogContent>
            </Modal>
        </React.Fragment>
    ));
};
