import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import ReactMarkdown from "react-markdown";
import {makeRenderers} from "@essence-community/constructor-share/uicomponents";
import {reaction} from "mobx";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {useGetValue} from "@essence-community/constructor-share/hooks/useCommon/useGetValue";
import {IBuilderClassConfig} from "../types";

export const TextContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc, pageStore} = props;
    const [text, setText] = React.useState<string | undefined>(bc.text);
    const getValue = useGetValue({pageStore});

    const renderers = React.useMemo(() => makeRenderers(pageStore, bc), [bc, pageStore]);

    React.useEffect(() => {
        if (bc.textuseparameter && bc.text) {
            const preText = `\`${bc.text.replace(/`/g, "\\`")}\``;

            setText(parseMemoize(preText).runer({get: getValue}) as string);

            return reaction(
                () => parseMemoize(preText).runer({get: getValue}) as string,
                (val) => {
                    setText(val);
                },
            );
        }
    }, [bc.text, bc.textuseparameter, getValue, pageStore]);

    if (text) {
        return <ReactMarkdown components={renderers}>{text}</ReactMarkdown>;
    }

    return null;
};
