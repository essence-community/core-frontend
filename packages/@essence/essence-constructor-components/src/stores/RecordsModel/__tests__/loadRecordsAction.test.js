import {getAttachedRecords} from "../loadRecordsAction";

describe("loadRecordsAction", () => {
    it("getAttachedRecords - должна возвращать запись на нужном месте", () => {
        const records = [{ckId: 1, text: "test1"}, {ckId: 2, text: "test2"}, {ckId: 3, text: "test3"}];
        const newRecord1 = {ckId: 1, text: "test_new_value"};
        const newRecord2 = {ckId: 2, text: "test_new_value"};
        const newRecord3 = {ckId: 3, text: "test_new_value"};

        expect(getAttachedRecords(records, newRecord1)).toEqual([newRecord1, records[1], records[2]]);
        expect(getAttachedRecords(records, newRecord2)).toEqual([records[0], newRecord2, records[2]]);
        expect(getAttachedRecords(records, newRecord3)).toEqual([records[0], records[1], newRecord3]);
    });
});
