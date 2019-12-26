import * as React from "react";
import {IBuilderConfig} from "@essence/essence-constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {useStyles} from "./IFrame.styles";

interface IIFrameProps {
    height?: string | number;
    bc: IBuilderConfig;
    value: string;
    typeiframe: "URL" | "HTML" | string;
}

export const IFrame: React.FC<IIFrameProps> = (props) => {
    const {height, bc, value, typeiframe} = props;
    const classes = useStyles();
    const iframeRef = React.useRef(null);

    React.useEffect(() => {
        const {current: iframe} = iframeRef;

        if (typeiframe === "HTML" && iframe) {
            // @ts-ignore
            iframe.contentWindow.document.open();
            // @ts-ignore
            iframe.contentWindow.document.write(value);
        }
    }, [typeiframe, value]);
    const frameProps = {
        allowFullScreen: true,
        className: classes.iframe,
        height,
        title: bc[VAR_RECORD_PAGE_OBJECT_ID],
        width: "100%",
    };

    return typeiframe === "URL" ? (
        <iframe key="URL" src={typeiframe === "URL" ? value : undefined} {...frameProps} />
    ) : (
        <iframe key="HTML" ref={iframeRef} {...frameProps} />
    );
};
