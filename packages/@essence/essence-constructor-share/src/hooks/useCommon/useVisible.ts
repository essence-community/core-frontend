import * as React from "react";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel} from "../../types";
import {parseMemoize} from "../../utils";
import {useGetValue} from "./useGetValue";

interface IVisibleProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

export function useVisible({bc, pageStore}: IVisibleProps): boolean {
    const {visible = false, visiblerule} = bc;
    const [res, setVisible] = React.useState<boolean>(visible);
    const getValue = useGetValue({pageStore});

    React.useEffect(() => {
        setVisible(visible);
        if (visiblerule) {
            return reaction(() => Boolean(parseMemoize(visiblerule).runer({get: getValue})), setVisible);
        }
    }, [getValue, visible, visiblerule]);

    return res;
}
