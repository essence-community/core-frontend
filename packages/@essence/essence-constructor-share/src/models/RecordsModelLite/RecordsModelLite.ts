import {observable, action, computed} from "mobx";
import {request} from "../../request";
import {
    META_PAGE_OBJECT,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_ERROR_CODE,
    VAR_ERROR_TEXT,
} from "../../constants/variables";
import {IRecord} from "../../types/Base";
import {loggerRoot} from "../../constants/base";
import {IBuilderConfig} from "../../types/Builder";
import {IRecordsModelLite, IRecordsState, ILoadRecordsProps} from "../../types/RecordsModel";

const logger = loggerRoot.extend("RecordsModelLite");

export class RecordsModelLite implements IRecordsModelLite {
    @computed get records(): IRecord[] {
        return this.recordsState.records;
    }
    @observable isLoading: boolean;
    @observable loadCounter = 0;
    recordId: string = VAR_RECORD_ID;
    @observable recordsState: IRecordsState<IRecord> = {
        isUserReload: false,
        records: [],
        status: "init",
    };
    bc: IBuilderConfig;
    constructor(bc: IBuilderConfig) {
        this.bc = bc;
        this.recordId = bc.idproperty || VAR_RECORD_ID;
    }
    @action loadRecordsAction(
        option: ILoadRecordsProps = {
            isUserReload: false,
            status: "autoload",
        },
    ) {
        this.isLoading = true;

        return request({
            [META_PAGE_OBJECT]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            action: "sql",
            list: true,
            query: this.bc[VAR_RECORD_QUERY_ID]!,
        })
            .then((response: IRecord[]) => {
                this.loadCounter += 1;
                this.isLoading = false;
                this.recordsState = {
                    isUserReload: option.isUserReload || false,
                    records: response,
                    status: option.status || "autoload",
                };
            })
            .catch((error: Error) => {
                this.loadCounter += 1;
                this.isLoading = false;
                const responseError = (error as any).responseError || {};

                if (responseError?.[VAR_ERROR_CODE] == "302") {
                    window.location.href = responseError?.[VAR_ERROR_TEXT];
                }
                logger(error);
            });
    }
}
