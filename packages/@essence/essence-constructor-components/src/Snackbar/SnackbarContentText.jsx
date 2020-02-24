// @flow
import * as React from "react";
import {Typography} from "@material-ui/core";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";

type PropsType = WithT & {
    text?: string,
    title?: string,
    description?: string,
    code?: string,
};

const redrenText = (text, trans) => {
    if (typeof text === "function") {
        return text(trans);
    }

    if (typeof text === "string") {
        return trans(text, text);
    }

    return text;
};

// eslint-disable-next-line id-length
const SnackbarContentText = ({text, title, description, code, t}: PropsType) => (
    <React.Fragment>
        {title ? (
            <Typography variant="body2" color="inherit">
                {redrenText(title, t)}
            </Typography>
        ) : null}
        {text ? (
            <Typography variant="body2" color="inherit" component="div">
                {redrenText(text, t)}
            </Typography>
        ) : null}
        {description ? (
            <Typography variant="body2" color="inherit">
                {t("static:b6c8c1519907418caad7f647068d1fb2", {description})}
            </Typography>
        ) : null}
        {code ? (
            <Typography variant="body2" color="inherit">
                {t("static:4cf741cfcf18478ab4ed3c3c79255a39", {code})}
            </Typography>
        ) : null}
    </React.Fragment>
);

export default withTranslation("meta")(SnackbarContentText);
