import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import ReactMarkdown from "react-markdown";
import {makeRenderers} from "@essence-community/constructor-share/uicomponents";
import {IBuilderClassConfig} from "../types";

export const TextContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc, pageStore} = props;

    const renderers = React.useMemo(() => makeRenderers(pageStore, bc), [bc, pageStore]);

    if (bc.text) {
        return <ReactMarkdown components={renderers}>{bc.text}</ReactMarkdown>;
    }

    return null;
};
