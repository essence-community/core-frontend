import * as React from "react";
import {LinearProgress} from "@material-ui/core";
import {useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import {ISnackbar} from "@essence-community/constructor-share/types";

const FULL_LOADED = 100;

interface IProgressBarProps {
    progressCount?: number;
    snackbar: ISnackbar;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({progressCount, snackbar}) => {
    const [trans] = useTranslation("meta");
    let content = toTranslateText(trans, snackbar.text);

    if (snackbar.status === "progress") {
        content =
            progressCount === FULL_LOADED ? (
                trans("static:aff0422be07246fb844794e2329fc578")
            ) : (
                <LinearProgress variant="determinate" value={progressCount} />
            );
    }

    return <div data-page-object="progress-loader">{content}</div>;
};
