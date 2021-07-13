/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useStyles} from "./IFrame.styles";

interface IIFrameProps {
    height?: string | number;
    bc: IBuilderConfig;
    value: string;
    typeiframe: "URL" | "HTML" | string;
}

const ABSOLUTE_URL_REG = /^(?:[a-z]+:)?\/\//iu;

export const IFrame: React.FC<IIFrameProps> = (props) => {
    const {height, bc, value, typeiframe} = props;
    const classes = useStyles();
    const iframeRef = React.useRef(null);
    const [trans] = useTranslation("meta");

    React.useEffect(() => {
        const {current: iframe} = iframeRef;

        if (typeiframe === "HTML" && iframe) {
            // @ts-ignore
            iframe.contentWindow.document.open();
            // @ts-ignore
            iframe.contentWindow.document.write(value);
        }
    }, [typeiframe, value, iframeRef, iframeRef.current]);
    const frameProps = {
        allowFullScreen: true,
        className: classes.iframe,
        height,
        title: bc[VAR_RECORD_PAGE_OBJECT_ID],
        width: "100%",
    };

    return typeiframe === "URL" ? (
        <iframe
            title={trans(bc[VAR_RECORD_DISPLAYED])}
            data-qtip={trans(bc[VAR_RECORD_DISPLAYED])}
            key="URL"
            src={ABSOLUTE_URL_REG.test(value) ? value : `//${value}`}
            {...frameProps}
        />
    ) : (
        <iframe
            title={trans(bc[VAR_RECORD_DISPLAYED])}
            data-qtip={trans(bc[VAR_RECORD_DISPLAYED])}
            key="HTML"
            ref={iframeRef}
            {...frameProps}
        />
    );
};
