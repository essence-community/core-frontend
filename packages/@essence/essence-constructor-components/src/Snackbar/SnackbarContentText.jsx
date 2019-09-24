// @flow
import * as React from "react";
import {Typography} from "@material-ui/core";

type PropsType = {
    text?: string,
    title?: string,
    description?: string,
    code?: string,
};

const SnackbarContentText = ({text, title, description, code}: PropsType) => (
    <React.Fragment>
        {title ? (
            <Typography variant="body2" color="inherit">
                {title}
            </Typography>
        ) : null}
        {text ? (
            <Typography variant="body2" color="inherit" component="div">
                {text}
            </Typography>
        ) : null}
        {description ? (
            <Typography variant="body2" color="inherit">
                Описание: {description}
            </Typography>
        ) : null}
        {code ? (
            <Typography variant="body2" color="inherit">
                Код ошибки: {code}
            </Typography>
        ) : null}
    </React.Fragment>
);

export default SnackbarContentText;
