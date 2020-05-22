import React from "react";
import {IField} from "../Form/types";
import {request} from "../request";
import {snackbarStore} from "../models/SnackbarModel";
import {IRecord, IPageModel, IBuilderConfig} from "../types";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_PAGE_OBJECT_ID, META_PAGE_OBJECT} from "../constants";
import {getMasterObject} from "../utils";
import {attachGlobalStore} from "../models/RecordsModel/loadRecordsAction";
import {VAR_RECORD_CT_DATE, VAR_RECORD_CV_VALUE} from "../constants/variables";

interface IDefaultValueQueryProps {
    field: IField;
    pageStore: IPageModel;
    bc: IBuilderConfig;
}
export function useDefaultValueQuery(props: IDefaultValueQueryProps) {
    const {bc, field, pageStore} = props;
    const {defaultvaluequery} = bc;

    React.useEffect(() => {
        if (defaultvaluequery) {
            const name = bc.datatype === "date" ? VAR_RECORD_CT_DATE : VAR_RECORD_CV_VALUE;

            field.setDefaultValueFn((field, setValue, clear) => {
                const json = {
                    filter: {},
                    master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue),
                };

                attachGlobalStore({bc, globalValues: pageStore.globalValues, json});
                request({
                    [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                    action: "dml",
                    json,
                    list: false,
                    query: defaultvaluequery,
                    session: pageStore.applicationStore.authStore.userInfo.session,
                })
                    .then((response: IRecord) => {
                        if (
                            response &&
                            snackbarStore.checkValidResponseAction(response, {
                                applicationStore: pageStore.applicationStore,
                                route: pageStore.route,
                            }) &&
                            response[name]
                        ) {
                            setValue(response[name]);
                        } else {
                            clear();
                        }
                    })
                    .catch((error: Error) => {
                        snackbarStore.checkExceptResponse(error, pageStore.route, pageStore.applicationStore);
                        clear();
                    });
            });
        }
    }, [defaultvaluequery, field, bc, pageStore]);
}
