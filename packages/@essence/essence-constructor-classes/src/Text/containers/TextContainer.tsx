import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share";
import ReactMarkdown from "react-markdown";
import {IBuilderClassConfig} from "../types";

export const TextContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc} = props;

    if (bc.text) {
        return <ReactMarkdown source={bc.text} />;
    }

    return null;
};
