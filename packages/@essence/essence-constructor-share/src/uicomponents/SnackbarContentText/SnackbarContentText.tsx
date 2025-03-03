import * as React from "react";
import {Typography} from "@material-ui/core";
import Linkify from "react-linkify";
import {useTranslation, toTranslateText} from "../../utils";
import {TText} from "../../types/SnackbarModel";

interface ISnackbarContentTextProps {
    children?: React.ReactNode;
    text?: TText;
    title?: TText;
    description?: TText;
    code?: TText;
}

function componentDecorator(decoratedHref: string, decoratedText: string, key: number): React.ReactNode {
    return (
        <a href={decoratedHref} key={key} rel="noopener noreferrer" target="_blank" style={{color: "inherit"}}>
            {decoratedText}
        </a>
    );
}

export const SnackbarContentText: React.FC<ISnackbarContentTextProps> = ({text, title, description, code}) => {
    const [trans] = useTranslation("meta");

    return (
        <React.Fragment>
            {title ? (
                <Typography variant="body2" color="inherit">
                    {toTranslateText(trans, title)}
                </Typography>
            ) : null}
            {text ? (
                <Typography variant="body2" color="inherit" component="div">
                    <Linkify componentDecorator={componentDecorator}>{toTranslateText(trans, text)}</Linkify>
                </Typography>
            ) : null}
            {description ? (
                <Typography variant="body2" color="inherit">
                    <Linkify componentDecorator={componentDecorator}>
                        {trans("static:900d174d0a994374a01b0005756521bc")}: {toTranslateText(trans, description)}
                    </Linkify>
                </Typography>
            ) : null}
            {code ? (
                <Typography variant="body2" color="inherit">
                    {trans("static:67aefce5785a4326920bef69acb5a403")}: {toTranslateText(trans, code)}
                </Typography>
            ) : null}
        </React.Fragment>
    );
};
