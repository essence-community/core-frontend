import * as React from "react";
import {Modal} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {IPageModel} from "../../types";
import {LineLoader} from "../LineLoader";
import {useStyles} from "./PageLoader.styles";

interface IPagerLoaderProps {
    pageStore: IPageModel;
    container?: HTMLDivElement;
    isLoading?: boolean;
    loaderType?: "default" | "bfl-loader";
}

export const PageLoader: React.FC<IPagerLoaderProps> = ({pageStore, container, isLoading, loaderType}) => {
    const classes = useStyles({});

    return useObserver(() => (
        <React.Fragment>
            <Modal
                open={Boolean(isLoading || (container && pageStore && pageStore.isLoading))}
                style={{position: "absolute"}}
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
    ));
};
