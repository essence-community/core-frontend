// @flow
import * as React from "react";
import {LinearProgress} from "@material-ui/core";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";

type PropsType = {|
    progressCount: number,
    status: any,
|};

const FULL_LOADED = 100;

// eslint-disable-next-line id-length
const ProgressBar = ({progressCount, status, t}: PropsType & WithT) => {
    let content = t("static:31b05bf92be1431894c448c4c3ef95bb");

    if (status === "progress") {
        content =
            progressCount === FULL_LOADED ? (
                t("static:aff0422be07246fb844794e2329fc578")
            ) : (
                <LinearProgress variant="determinate" value={progressCount} />
            );
    }

    if (status === "errorUpload") {
        content = t("static:c80abfb5b59c400ca1f8f9e868e4c761");
    }

    return <div data-page-object="progress-loader">{content}</div>;
};

export default withTranslation("meta")(ProgressBar);
