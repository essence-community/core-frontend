import {useEffect} from "react";
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

    useEffect(() => {
        if (store.bc.getglobal) {
            return reaction(
                () => parseMemoize(store.bc.getglobal).runer({get: getValueGlobal}),
                (value) => {
                    if (isEmpty(value)) {
                        return;
                    }
                    const foundRec = store.childs.find(
                        (val) => val.ckobject === value || val[VAR_RECORD_NAME] === value,
                    );

                    if (foundRec && !store.tabStatus[foundRec[VAR_RECORD_PAGE_OBJECT_ID]].hidden) {
                        store.setActiveTab(foundRec[VAR_RECORD_PAGE_OBJECT_ID]);
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [getValueGlobal, store]);
}
