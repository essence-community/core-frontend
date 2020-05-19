import {useEffect} from "react";
import {History, Location, LocationState, Action} from "history";
import {matchPath} from "react-router-dom";
import {IApplicationModel} from "@essence-community/constructor-share/types";
import {VAR_RECORD_ID, VAR_RECORD_URL} from "@essence-community/constructor-share/constants";

interface IUseHistoryListenProps {
    history: History;
    applicationStore: IApplicationModel;
}

interface IMatch {
    appName: string;
    ckId: string;
}

export function useHistoryListen({history, applicationStore}: IUseHistoryListenProps) {
    useEffect(() => {
        const handleHistory = (location: Location<LocationState>, action: Action) => {
            if (action === "POP") {
                const match = matchPath<IMatch>(location.pathname, "/:appName/:ckId");

                if (match) {
                    const {ckId} = match.params;
                    const {routesStore} = applicationStore;
                    const route = routesStore?.recordsStore.records.find(
                        (rec) => rec[VAR_RECORD_ID] === ckId || rec[VAR_RECORD_URL] === ckId,
                    );

                    if (route) {
                        applicationStore.pagesStore.setPageAction(route[VAR_RECORD_ID] as string, false);
                    }
                }
            }
        };

        return history.listen(handleHistory);
    }, [applicationStore, applicationStore.pagesStore, history]);
}
