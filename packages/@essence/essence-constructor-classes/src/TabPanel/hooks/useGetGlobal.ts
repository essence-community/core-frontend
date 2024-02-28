import {useEffect, useState} from "react";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_NAME, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {reaction} from "mobx";
import {useGetValue} from "@essence-community/constructor-share/hooks/useCommon/useGetValue";
import {isEmpty, parseMemoize} from "@essence-community/constructor-share/utils";
import {TabPanelModel} from "../store/TabPanelModel";

interface IUseTabProps {
    store: TabPanelModel;
}

export function useGetGlobal(props: IUseTabProps) {
    const {store} = props;
    const getValueGlobal = useGetValue({pageStore: store.pageStore});
    const [, setLastActiveGlobal] = useState<string>(null);

    useEffect(() => {
        if (store.bc.getglobal) {
            return reaction(
                () => {
                    const value = parseMemoize(store.bc.getglobal).runer({get: getValueGlobal});
                    const foundRec = store.childs.find(
                        (val) => val.ckobject === value || val[VAR_RECORD_NAME] === value,
                    );

                    return foundRec && !store.tabStatus[foundRec[VAR_RECORD_PAGE_OBJECT_ID]].hidden
                        ? foundRec[VAR_RECORD_PAGE_OBJECT_ID]
                        : undefined;
                },
                (value) => {
                    if (isEmpty(value)) {
                        setLastActiveGlobal(null);

                        return;
                    }
                    setLastActiveGlobal((val) => {
                        if (val !== value) {
                            store.setActiveTab(value);
                        }

                        return value;
                    });
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [getValueGlobal, store]);
}
