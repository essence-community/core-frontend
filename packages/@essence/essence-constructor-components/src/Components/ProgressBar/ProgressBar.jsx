// @flow
import * as React from "react";
import {LinearProgress} from "@material-ui/core";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";

type PropsType = {|
    progressCount: number,
    snackbar: any,
|};

const FULL_LOADED = 100;

// eslint-disable-next-line id-length
const ProgressBar = ({progressCount, snackbar, t}: PropsType & WithT) => {
    let content = typeof snackbar.text === "function" ? snackbar.text(t) : t(snackbar.text);

    if (snackbar.status === "progress") {
        content =
            progressCount === FULL_LOADED ? (
                t("static:aff0422be07246fb844794e2329fc578")
            ) : (
                <LinearProgress variant="determinate" value={progressCount} />
            );
    }

    return <div data-page-object="progress-loader">{content}</div>;
};

export default withTranslation("meta")(ProgressBar);
