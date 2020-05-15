import {VAR_RECORD_ID, VAR_RECORD_PARENT_ID, VAR_RECORD_NAME} from "@essence-community/constructor-share/constants";

export const treeRecords = [
    {[VAR_RECORD_ID]: "1", [VAR_RECORD_NAME]: "root", [VAR_RECORD_PARENT_ID]: null, leaf: "false"},
    {[VAR_RECORD_ID]: "2", [VAR_RECORD_NAME]: "first", [VAR_RECORD_PARENT_ID]: "1", leaf: "false"},
    {[VAR_RECORD_ID]: "3", [VAR_RECORD_NAME]: "second", [VAR_RECORD_PARENT_ID]: "2", leaf: "true"},
    {[VAR_RECORD_ID]: "4", [VAR_RECORD_NAME]: "first-first", [VAR_RECORD_PARENT_ID]: "2", leaf: "true"},
];
export const records = [
    {[VAR_RECORD_ID]: "10", [VAR_RECORD_NAME]: "root"},
    {[VAR_RECORD_ID]: "11", [VAR_RECORD_NAME]: "first"},
    {[VAR_RECORD_ID]: "12", [VAR_RECORD_NAME]: "second"},
];
