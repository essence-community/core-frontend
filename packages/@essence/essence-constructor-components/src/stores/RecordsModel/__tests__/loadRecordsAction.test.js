import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {getAttachedRecords} from "../loadRecordsAction";

describe("loadRecordsAction", () => {
    it("getAttachedRecords - должна возвращать запись на нужном месте", () => {
        const records = [
            {[VAR_RECORD_ID]: 1, text: "test1"},
            {[VAR_RECORD_ID]: 2, text: "test2"},
            {[VAR_RECORD_ID]: 3, text: "test3"},
        ];
        const newRecord1 = {[VAR_RECORD_ID]: 1, text: "test_new_value"};
        const newRecord2 = {[VAR_RECORD_ID]: 2, text: "test_new_value"};
        const newRecord3 = {[VAR_RECORD_ID]: 3, text: "test_new_value"};

        expect(getAttachedRecords(records, newRecord1)).toEqual([newRecord1, records[1], records[2]]);
        expect(getAttachedRecords(records, newRecord2)).toEqual([records[0], newRecord2, records[2]]);
        expect(getAttachedRecords(records, newRecord3)).toEqual([records[0], records[1], newRecord3]);
    });
});
