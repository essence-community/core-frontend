import {Typography} from "@material-ui/core";
import * as React from "react";
import {useTranslation} from "@essence/essence-constructor-share/utils";

interface ISnackbarContentTextProps {
    text?: string | Element;
    title?: string;
    description?: string;
    code?: string;
}

export const SnackbarContentText: React.FC<ISnackbarContentTextProps> = ({text, title, description, code}) => {
    const [trans] = useTranslation("meta");

    return (
        <React.Fragment>
            {title ? (
                <Typography variant="body2" color="inherit">
                    {trans(title)}
                </Typography>
            ) : null}
            {text ? (
                <Typography variant="body2" color="inherit" component="div">
                    {typeof text === "string" ? trans(text) : text}
                </Typography>
            ) : null}
            {description ? (
                <Typography variant="body2" color="inherit">
                    {trans("900d174d0a994374a01b0005756521bc")}: {trans(description)}
                </Typography>
            ) : null}
            {code ? (
                <Typography variant="body2" color="inherit">
                    {trans("67aefce5785a4326920bef69acb5a403")}: {trans(code)}
                </Typography>
            ) : null}
        </React.Fragment>
    );
};
