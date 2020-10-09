import * as React from "react";
import {IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {useModel} from "@essence-community/constructor-share/hooks";
import {autorun, reaction} from "mobx";
import {ServiceHiddenModel} from "../stores/ServiceHiddenModel";

export const ServiceHiddenContainer: React.FC<IClassProps> = (props) => {
    const {
        bc: {setglobal, idproperty, getglobaltostore},
        pageStore,
    } = props;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new ServiceHiddenModel({...options, applicationStore}), props);

    // Set record to global
    React.useEffect(() => {
        if (setglobal?.length) {
            const calcRecord = (record: IRecord = {}) => {
                const values = setglobal.reduce<IRecord>((acc, {in: keyIn, out}) => {
                    acc[out] = record[keyIn || idproperty || out];

                    return acc;
                }, {});

                pageStore.updateGlobalValues(values);
            };
            const disponse = autorun(() => {
                const [record = {}] = store.recordsStore.records;

                calcRecord(record);
            });

            return () => {
                disponse();
                calcRecord();
            };
        }

        return undefined;
    }, [setglobal, pageStore, store]);

    /*
     * Listen to new values in the getglobaltostore
     * For input field can be a lot of requests. Avoid to use text field for this component
     */
    React.useEffect(() => {
        if (getglobaltostore) {
            const dispose = reaction(
                () => getglobaltostore.map(({in: keyIn}) => pageStore.globalValues.get(keyIn)).join(":"),
                store.reloadStoreAction,
                {
                    delay: 300,
                },
            );

            return dispose;
        }

        return undefined;
    }, [getglobaltostore, pageStore, store]);

    return null;
};
