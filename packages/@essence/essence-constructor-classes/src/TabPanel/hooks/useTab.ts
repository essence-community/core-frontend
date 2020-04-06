import {useEffect, useCallback} from "react";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {TabPanelModel} from "../store/TabPanelModel";

interface IUseTabProps {
    store: TabPanelModel;
    hidden?: boolean;
    isActive: boolean;
    bc: IBuilderConfig;
    value: string;
    disabled?: boolean;
}

export function useTab(props: IUseTabProps) {
    const {store, hidden, isActive, value, bc, disabled} = props;
    const handleChangeHidden = useCallback(
        (objectId: string) => {
            store.setTabStatus(objectId, {
                hidden,
            });

            if (isActive && hidden) {
                requestAnimationFrame(store.setFirstActiveTab);
            }
        },
        [hidden, isActive, store],
    );
    const handleChangeTab = (event: React.SyntheticEvent) => {
        event.preventDefault();
        store.setActiveTab(value);
    };

    useEffect(() => {
        const objectId = bc[VAR_RECORD_PAGE_OBJECT_ID];

        if (objectId) {
            store.setOpenedTab(objectId, !(disabled || hidden));
            handleChangeHidden(objectId);
        }
    }, [bc, disabled, handleChangeHidden, hidden, store]);

    return {onChangeTab: handleChangeTab};
}
