import * as React from "react";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel} from "../../types";
import {useGetValue} from "./useGetValue";
import {isDisabled} from "./isDisabled";

interface IDisabledProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

export function useDisable(props: IDisabledProps): boolean {
    const {bc, pageStore} = props;
    const {disabled = false} = bc;
    const [res, setDisabled] = React.useState<boolean>(disabled);
    const getValue = useGetValue({pageStore});

    React.useEffect(
        () =>
            reaction(
                () =>
                    Boolean(
                        isDisabled({
                            ...props,
                            getValue,
                        }),
                    ),
                setDisabled,
                {
                    fireImmediately: true,
                },
            ),
        [getValue, disabled],
    );

    return res;
}
