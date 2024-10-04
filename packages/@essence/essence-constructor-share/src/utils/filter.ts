/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment, {unitOfTime} from "moment";
import {FieldValue, IRecord} from "../types/Base";
import {IRecordsOrder, IRecordFilter} from "../types/RecordsModel";
import {isEmpty} from "./base";
import {getBigNumberInstance} from "./bignumber";

const formatStr: Record<string, unitOfTime.StartOf> = {
    1: "year",
    2: "month",
    3: "day",
    4: "hour",
    5: "minute",
    6: "second",
};
const NULL_OPERATOR = ["null", "is null", "notnull", "not null", "is not null"];
const isNullAndUndefined = (val: FieldValue) => typeof val === "undefined" || val == null;
const {BigNumber} = getBigNumberInstance({
    decimalprecision: -1,
    thousandseparator: "",
} as any);

export function sortFilesData(jlSort: IRecordsOrder[]) {
    if (!isEmpty(jlSort)) {
        const cloneArr = [...jlSort];

        return (obj1: IRecord, obj2: IRecord) =>
            cloneArr.reduce((val: number, item) => {
                if (val !== 0) {
                    return val;
                }
                if (isEmpty(item.property) || isEmpty(item.direction)) {
                    return val;
                }
                const {datatype, format = "3", property} = item;
                const nmColumn = property || "";
                const direction = item.direction?.toUpperCase() || "ASC";
                const val1 = obj1[nmColumn];
                const val2 = obj2[nmColumn];

                if (isNullAndUndefined(val1) && isNullAndUndefined(val2)) {
                    return val;
                }
                if (isNullAndUndefined(val1) && !isNullAndUndefined(val2)) {
                    return val;
                }
                if (!isNullAndUndefined(val1) && isNullAndUndefined(val2)) {
                    return val;
                }

                if (
                    datatype === "date" ||
                    nmColumn.startsWith("cd_") ||
                    nmColumn.startsWith("ct_") ||
                    nmColumn.startsWith("fd_") ||
                    nmColumn.startsWith("ft_")
                ) {
                    return moment(direction === "ASC" ? (val1 as string) : (val2 as string)).diff(
                        moment(direction === "ASC" ? (val2 as string) : (val1 as string)),
                        formatStr[format] as any,
                    );
                }
                if (typeof val1 === "number" && typeof val2 === "number") {
                    return direction === "ASC" ? val1 - val2 : val2 - val1;
                }
                if (datatype === "integer" || datatype === "numeric") {
                    return direction === "ASC"
                        ? new BigNumber(val1 as any).minus(new BigNumber(val2 as any)).toNumber()
                        : new BigNumber(val2 as any).minus(new BigNumber(val1 as any)).toNumber();
                }
                if (typeof val1 === "string" && typeof val2 === "string") {
                    return ((direction === "ASC" ? val1 : val2) || "").localeCompare(
                        (direction === "ASC" ? val2 : val1) || "",
                    );
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return +(direction === "ASC" ? val1 > val2 : val2 > val1);
            }, 0);
    }

    return (obj1: IRecord, obj2: IRecord) => +(obj1 > obj2);
}

export function filterFilesData(jlFilter: IRecordFilter[]) {
    if (!isEmpty(jlFilter)) {
        return (obj: IRecord) =>
            jlFilter.filter((item) => {
                if (isEmpty(item.property)) {
                    return true;
                }
                if (isEmpty(item.operator)) {
                    return true;
                }
                const {datatype, format = "3", property} = item;
                const nmColumn = property;
                const operator = item.operator.toLowerCase();
                const value = item.value;
                const valueRecord = obj[nmColumn];

                if (isNullAndUndefined(valueRecord) && NULL_OPERATOR.indexOf(operator) < 0) {
                    return false;
                }

                if (isNullAndUndefined(value) && NULL_OPERATOR.indexOf(operator) < 0) {
                    return true;
                }

                switch (operator) {
                    case "gt":
                    case ">":
                        if (
                            typeof valueRecord === "string" &&
                            typeof value === "string" &&
                            (datatype === "date" ||
                                nmColumn.startsWith("cd_") ||
                                nmColumn.startsWith("ct_") ||
                                nmColumn.startsWith("fd_") ||
                                nmColumn.startsWith("ft_"))
                        ) {
                            return moment(valueRecord).isAfter(value, formatStr[format]);
                        }

                        return new BigNumber(valueRecord as any).gt(new BigNumber(value as any));
                    case "ge":
                    case ">=":
                        if (
                            typeof valueRecord === "string" &&
                            typeof value === "string" &&
                            (datatype === "date" ||
                                nmColumn.startsWith("cd_") ||
                                nmColumn.startsWith("ct_") ||
                                nmColumn.startsWith("fd_") ||
                                nmColumn.startsWith("ft_"))
                        ) {
                            return moment(valueRecord).isSameOrAfter(value, formatStr[format]);
                        }

                        return new BigNumber(valueRecord as any).gte(new BigNumber(value as any));
                    case "lt":
                    case "<":
                        if (
                            typeof valueRecord === "string" &&
                            typeof value === "string" &&
                            (datatype === "date" ||
                                nmColumn.startsWith("cd_") ||
                                nmColumn.startsWith("ct_") ||
                                nmColumn.startsWith("fd_") ||
                                nmColumn.startsWith("ft_"))
                        ) {
                            return moment(valueRecord).isBefore(value, formatStr[format]);
                        }

                        return new BigNumber(valueRecord as any).lt(new BigNumber(value as any));
                    case "le":
                    case "<=":
                        if (
                            typeof valueRecord === "string" &&
                            typeof value === "string" &&
                            (datatype === "date" ||
                                nmColumn.startsWith("cd_") ||
                                nmColumn.startsWith("ct_") ||
                                nmColumn.startsWith("fd_") ||
                                nmColumn.startsWith("ft_"))
                        ) {
                            return moment(valueRecord).isSameOrBefore(value, formatStr[format]);
                        }

                        return new BigNumber(valueRecord as any).lte(new BigNumber(value as any));
                    case "eq":
                    case "=":
                        if (
                            typeof valueRecord === "string" &&
                            typeof value === "string" &&
                            (datatype === "date" ||
                                nmColumn.startsWith("cd_") ||
                                nmColumn.startsWith("ct_") ||
                                nmColumn.startsWith("fd_") ||
                                nmColumn.startsWith("ft_"))
                        ) {
                            return moment(valueRecord).isSame(value, formatStr[format]);
                        }

                        return `${valueRecord}` === `${value}`;
                    case "ne":
                    case "!=":
                    case "<>":
                        if (
                            typeof valueRecord === "string" &&
                            typeof value === "string" &&
                            (datatype === "date" ||
                                nmColumn.startsWith("cd_") ||
                                nmColumn.startsWith("ct_") ||
                                nmColumn.startsWith("fd_") ||
                                nmColumn.startsWith("ft_"))
                        ) {
                            return !moment(valueRecord).isSame(value, formatStr[format]);
                        }

                        return `${valueRecord}` !== `${value}`;
                    case "like":
                    case "~": {
                        const reg = new RegExp(value as string, "gi");

                        return reg.test(`${valueRecord}`);
                    }
                    case "not like":
                    case "notlike":
                    case "nl":
                    case "!~": {
                        const reg = new RegExp(value as string, "gi");

                        return !reg.test(`${valueRecord}`);
                    }
                    case "null":
                    case "is null": {
                        return isEmpty(valueRecord);
                    }
                    case "notnull":
                    case "not null":
                    case "is not null": {
                        return !isEmpty(valueRecord);
                    }
                    case "in":
                        return (value as any).indexOf(valueRecord) > -1;
                    case "not in":
                        return (value as any).indexOf(valueRecord) === -1;
                    default:
                        return true;
                }
            }).length === jlFilter.length;
    }

    return () => true;
}
