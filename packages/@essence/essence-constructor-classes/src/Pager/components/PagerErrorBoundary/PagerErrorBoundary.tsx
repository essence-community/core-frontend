import * as React from "react";
import {IPageModel} from "@essence-community/constructor-share/types";
import {snackbarStore} from "@essence-community/constructor-share/models/SnackbarModel";
import {loggerRoot} from "@essence-community/constructor-share/constants";
import {TFunction} from "@essence-community/constructor-share/utils";

const logger = loggerRoot.extend("PagerErrorBoundary");

interface IPagerErrorBoundaryProps {
    pageStore: IPageModel;
}

export class PagerErrorBoundary extends React.Component<IPagerErrorBoundaryProps> {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const {pageStore} = this.props;

        logger(error, errorInfo);

        pageStore.applicationStore.pagesStore.removePageAction(pageStore.pageId);
        snackbarStore.snackbarOpenAction(
            {
                autoHidden: true,
                status: "error",
                text: (trans: TFunction) => trans("static:fea1eaf13fd24f25b327e76099e22495"),
            },
            pageStore.route,
        );
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}
