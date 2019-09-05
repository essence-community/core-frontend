// @flow
export const treeRecords = [
    {ckId: "1", ckParent: null, cvName: "root", leaf: "false"},
    {ckId: "2", ckParent: "1", cvName: "first", leaf: "false"},
    {ckId: "3", ckParent: "2", cvName: "second", leaf: "true"},
    {ckId: "4", ckParent: "2", cvName: "first-first", leaf: "true"},
];
export const records = [{ckId: "10", cvName: "root"}, {ckId: "11", cvName: "first"}, {ckId: "12", cvName: "second"}];
