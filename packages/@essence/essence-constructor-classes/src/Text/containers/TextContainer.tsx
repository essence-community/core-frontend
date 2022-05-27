import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import ReactMarkdown from "react-markdown";
import {makeRenderers} from "@essence-community/constructor-share/uicomponents";
import {FormContext, ParentFieldContext, RecordContext} from "@essence-community/constructor-share/context";
import {deepFind} from "@essence-community/constructor-share/utils";
import {reaction} from "mobx";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {IBuilderClassConfig} from "../types";

export const TextContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc, pageStore} = props;
    const [text, setText] = React.useState<string | undefined>(bc.text);
    const recordContext = React.useContext(RecordContext);
    const formContext = React.useContext(FormContext);
    const parentFieldContext = React.useContext(ParentFieldContext);

    const renderers = React.useMemo(() => makeRenderers(pageStore, bc), [bc, pageStore]);

    React.useEffect(() => {
        if (bc.textuseparameter && bc.text) {
            const preText = `\`${bc.text.replace(/`/g, "\\`")}\``;
            const getValue = (name: string) => {
                if (name.charAt(0) === "g") {
                    return pageStore.globalValues.get(name);
                }

                if (recordContext) {
                    const [isExistRecord, recValue] = deepFind(recordContext, name);

                    if (isExistRecord) {
                        return recValue;
                    }
                }

                if (formContext) {
                    const values = formContext.values;

                    if (parentFieldContext) {
                        const [isExistParent, val] = deepFind(values, `${parentFieldContext.key}.${name}`);

                        if (isExistParent) {
                            return val;
                        }
                    }

                    const [isExist, val] = deepFind(values, name);

                    if (isExist) {
                        return val;
                    }
                }

                return undefined;
            };

            setText(parseMemoize(preText).runer({get: getValue}));

            return reaction(
                () => parseMemoize(preText).runer({get: getValue}),
                (val) => {
                    setText(val);
                },
            );
        }
    }, [bc.text, bc.textuseparameter, formContext, pageStore, parentFieldContext, recordContext]);

    if (text) {
        return <ReactMarkdown source={text} renderers={renderers} />;
    }

    return null;
};
