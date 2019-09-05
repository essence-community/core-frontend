// @flow
import * as React from "react";
import Typography from "@material-ui/core/Typography";

type PropsType = {
    text?: string,
    title?: string,
    description?: string,
    code?: string,
};

const SnackbarContentText = ({text, title, description, code}: PropsType) => (
    <React.Fragment>
        {title ? <Typography color="inherit">{title}</Typography> : null}
        {text ? (
            <Typography color="inherit" component="div">
                {text}
            </Typography>
        ) : null}
        {description ? <Typography color="inherit">Описание: {description}</Typography> : null}
        {code ? <Typography color="inherit">Код ошибки: {code}</Typography> : null}
    </React.Fragment>
);

export default SnackbarContentText;
