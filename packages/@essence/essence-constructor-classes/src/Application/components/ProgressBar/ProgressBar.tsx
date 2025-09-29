import * as React from "react";
import {LinearProgress} from "@mui/material";
import {useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import {ISnackbar} from "@essence-community/constructor-share/types";

interface IProgressBarProps {
    progressCount?: number;
    snackbar: ISnackbar;
    isFinished: boolean;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({progressCount, snackbar, isFinished}) => {
    const [trans] = useTranslation("meta");
    let content = toTranslateText(trans, snackbar.text);

    if (snackbar.status === "progress") {
        content = isFinished ? (
            trans("static:aff0422be07246fb844794e2329fc578")
        ) : (
            <LinearProgress variant="determinate" value={progressCount} />
        );
    }

    return <div data-page-object="progress-loader">{content}</div>;
};
