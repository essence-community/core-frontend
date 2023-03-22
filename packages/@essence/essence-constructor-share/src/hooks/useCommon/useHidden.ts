import * as React from "react";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel} from "../../types";
import {parseMemoize} from "../../utils";
import {useGetValue} from "./useGetValue";

interface IHiddenProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

export function useHidden({bc, pageStore}: IHiddenProps): boolean {
    const {hidden = false, hiddenrules} = bc;
    const [res, setHidden] = React.useState<boolean>(hidden);
    const getValue = useGetValue({pageStore});

    React.useEffect(() => {
        setHidden(hidden);
        if (hiddenrules) {
            return reaction(() => Boolean(parseMemoize(hiddenrules).runer({get: getValue})), setHidden);
        }
    }, [getValue, hidden, hiddenrules]);

    return res;
}
