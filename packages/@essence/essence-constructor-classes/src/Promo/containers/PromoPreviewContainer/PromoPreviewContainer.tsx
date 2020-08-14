import * as React from "react";
import {IClassProps, VAR_RECORD_MASTER_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share";
import {useObserver} from "mobx-react";
import {PromoExampleBuildModel} from "../../store/PromoExampleBuildModel";

export const PromoPreviewContainer: React.FC<IClassProps> = ({pageStore, bc}) => {
    const masterId = bc[VAR_RECORD_MASTER_ID];
    const masterStore = masterId && pageStore.stores.get(masterId);

    // Change to editable for demo mode
    React.useEffect(() => {
        const formStore = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

        if (formStore) {
            formStore.invokeHandler("onAdd", ["1", bc, {}]);
        }
    }, [bc, pageStore.stores]);

    return useObserver(() => {
        if (masterStore instanceof PromoExampleBuildModel) {
            return (
                <div>
                    <pre>{JSON.stringify(masterStore.values, null, 2)}</pre>
                </div>
            );
        }

        return null;
    });
};
