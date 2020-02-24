import {Typography} from "@material-ui/core";
import * as React from "react";
import {useTranslation, TFunction} from "@essence-community/constructor-share/utils";

type TText = string | JSX.Element | ((trans: TFunction) => string | JSX.Element);

interface ISnackbarContentTextProps {
    text?: TText;
    title?: TText;
    description?: string;
    code?: string;
}

const redrenText = (text: TText, trans: TFunction) => {
    if (typeof text === "function") {
        return text(trans);
    }

    if (typeof text === "string") {
        return trans(text, text);
    }

    return text;
};

export const SnackbarContentText: React.FC<ISnackbarContentTextProps> = ({text, title, description, code}) => {
    const [trans] = useTranslation("meta");

    return (
        <React.Fragment>
            {title ? (
                <Typography variant="body2" color="inherit">
                    {redrenText(title, trans)}
                </Typography>
            ) : null}
            {text ? (
                <Typography variant="body2" color="inherit" component="div">
                    {text}
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
