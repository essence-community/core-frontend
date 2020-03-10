import * as React from "react";
import {Typography} from "@material-ui/core";
import {useTranslation, toTranslateText} from "../../utils";
import {TText} from "../../types/SnackbarModel";

interface ISnackbarContentTextProps {
    text?: TText;
    title?: TText;
    description?: string;
    code?: string;
}

export const SnackbarContentText: React.FC<ISnackbarContentTextProps> = ({text, title, description, code}) => {
    const [trans] = useTranslation("meta");

    return (
        <React.Fragment>
            {title ? (
                <Typography variant="body2" color="inherit">
                    {toTranslateText(title, trans)}
                </Typography>
            ) : null}
            {text ? (
                <Typography variant="body2" color="inherit" component="div">
                    {toTranslateText(text, trans)}
                </Typography>
            ) : null}
            {description ? (
                <Typography variant="body2" color="inherit">
                    {trans("static:900d174d0a994374a01b0005756521bc")}: {trans(description)}
                </Typography>
            ) : null}
            {code ? (
                <Typography variant="body2" color="inherit">
                    {trans("static:67aefce5785a4326920bef69acb5a403")}: {trans(code)}
                </Typography>
            ) : null}
        </React.Fragment>
    );
};
