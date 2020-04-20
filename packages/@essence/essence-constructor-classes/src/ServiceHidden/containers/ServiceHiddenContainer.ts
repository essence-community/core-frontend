import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {useModel} from "@essence-community/constructor-share/hooks";
import {autorun, reaction} from "mobx";
import {parseMemoize, setglobalToParse, findGetGlobalKey} from "@essence-community/constructor-share/utils";
import {ServiceHiddenModel} from "../stores/ServiceHiddenModel";

export const ServiceHiddenContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new ServiceHiddenModel({...options, applicationStore}), props);

    // Set record to global
    React.useEffect(() => {
        if (bc.setglobal) {
            const calcRecord = (record: any = {}) => {
                const values = parseMemoize(setglobalToParse(bc.setglobal!)).runer({
                    get: (name: string) => record[name],
                });

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
    }, [bc.setglobal, pageStore, store]);

    /*
     * Listen to new values in the getglobaltostore
     * For input field can be a lot of requests. Avoid to use text field for this component
     */
    React.useEffect(() => {
        const {getglobaltostore} = bc;

        if (getglobaltostore) {
            const dispose = reaction(
                () => {
                    const globalKeys: Record<string, string> = findGetGlobalKey(getglobaltostore);

                    return Object.values(globalKeys)
                        .map((name) => pageStore.globalValues.get(name))
                        .join(":");
                },
                store.reloadStoreAction,
                {
                    delay: 300,
                },
            );

            return dispose;
        }

        return undefined;
    }, [bc, pageStore, store]);

    return null;
};
