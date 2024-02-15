import React from "react";
import {reaction} from "mobx";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {deepFind} from "@essence-community/constructor-share/utils/transform";
import {isEmpty} from "@essence-community/constructor-share";
import {IGridModel} from "../stores/GridModel/GridModel.types";

interface IUseGetGlobalGridProps {
    store: IGridModel;
}

export function useGetGlobalGrid({store}: IUseGetGlobalGridProps): void {
    React.useEffect(() => {
        if (store.bc.getglobal) {
            return reaction(
                () => parseMemoize(store.bc.getglobal).runer({get: store.recordsStore.getValue}),
                (recordIdValueGetGlobal) => {
                    if (isEmpty(recordIdValueGetGlobal)) {
                        return;
                    }
                    const foundRec = store.recordsStore.recordsState.records.find(
                        (rec) => `${recordIdValueGetGlobal}` === `${deepFind(rec, store.recordsStore.valueField)[1]}`,
                    );

                    if (foundRec) {
                        store.recordsStore.setSelectionAction(deepFind(foundRec, store.recordsStore.valueField)[1]);
                        store.scrollToRecordAction({});
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [store]);

    React.useEffect(() => {
        return reaction(
            () => [store.recordsStore.recordsState, store.recordsStore.selectedRecordId],
            (val) => {
                if (isEmpty(val[1])) {
                    return;
                }
                store.scrollToRecordAction({});
            },
            {
                fireImmediately: true,
            },
        );
    }, [store]);
}
