import {Typography} from "@material-ui/core";
import * as React from "react";

interface ISnackbarContentTextProps {
    text?: string | Element;
    title?: string;
    description?: string;
    code?: string;
}

export const SnackbarContentText: React.FC<ISnackbarContentTextProps> = ({text, title, description, code}) => (
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
