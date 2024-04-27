import moment from "moment";
import {TFunction} from "@essence-community/constructor-share/utils";
import {IDateConfig} from "../components/FieldDate.types";
import {FieldDateBase} from "../components/FieldDateBase/FieldDateBase";
import {FieldDateMonth} from "../components/FieldDateMonth/FieldDateMonth";
import {FieldDateMain} from "../components/FieldDateMain/FieldDateMain";

const dateTypeMap = {
    "F Y": 2,
    // eslint-disable-next-line id-length
    Y: 1,
    "d.m.Y": 3,
    "d.m.Y H:00": 4,
    "d.m.Y H:i": 5,
    "d.m.Y H:i:s": 6,
} as Record<string, number>;

const getFieldType = (item: string): number => {
    if (typeof item === "string") {
        return dateTypeMap[item] || parseInt(item, 10);
    }

    return item;
};

export const dateMap = (trans: TFunction): Record<string | number, IDateConfig> => ({
    1: {
        component: FieldDateBase,
        dateType: "1",
        format: "YYYY",
        formatText: trans("static:773ed9a089214ab9b0bd149be5685ba0"),
        inputMask: "9999",
        invalidText: (value: string) => `${value} ${trans("static:271b81793a72461192644b7f4578ac51")}`,
        invalidTextValidation: trans("static:3c205218305a4a25bada37004775789c"),
        mode: "year",
        serverFormat: "YYYY-01-01T00:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("year").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
    },
    2: {
        component: FieldDateMonth,
        dateType: "2",
        format: "MMM YYYY",
        formatText: trans("static:02983497059143b9b97cc0e7d0c4691d"),
        invalidText: (value: string) => `${value} ${trans("static:a40a4372823f44ffa7a69e699b0b15db")}`,
        invalidTextValidation: trans("static:6b6305d16db148d986e782a66c4318da"),
        serverFormat: "YYYY-MM-01T00:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
    },
    3: {
        component: FieldDateMain,
        dateType: "3",
        format: "DD.MM.YYYY",
        formatText: trans("static:acfdddfef80c4e5c90a3052e286d7919"),
        inputMask: "99.99.9999",
        invalidText: (value: string) => `${value} ${trans("static:f0f42f35a2d241f3b51cd16747c37186")}`,
        invalidTextValidation: trans("static:77050515e7b2462e95429b9df33a7958"),
        serverFormat: "YYYY-MM-DDT00:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
    },
    4: {
        component: FieldDateMain,
        dateType: "4",
        format: "DD.MM.YYYY HH:00",
        formatText: trans("static:149c3a8684224bc2939e613271f5c704"),
        inputMask: "99.99.9999 99:00",
        invalidText: (value: string) => `${value} ${trans("static:ce35e3e6067d4343af8b30ea38d01f96")}`,
        invalidTextValidation: trans("static:1583ea7e4b054c759818771219303c3c"),
        serverFormat: "YYYY-MM-DDTHH:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("hour").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
        withTime: true,
    },
    5: {
        component: FieldDateMain,
        dateType: "5",
        format: "DD.MM.YYYY HH:mm",
        formatText: trans("static:6b5f29158ba142c3963649e1219a8f1e"),
        inputMask: "99.99.9999 99:99",
        invalidText: (value: string) => `${value} ${trans("static:c43175882dda4f7abce9bb7325cd8847")}`,
        invalidTextValidation: trans("static:a1fadf8d7e73453b8a1ed526f3d1103e"),
        serverFormat: "YYYY-MM-DDTHH:mm:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("minute").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
        withTime: true,
    },
    6: {
        component: FieldDateMain,
        dateType: "6",
        format: "DD.MM.YYYY HH:mm:ss",
        formatText: trans("static:52f802c6dab84eacbb4e6068aedcaa77"),
        inputMask: "99.99.9999 99:99:99",
        invalidText: (value: string) => `${value} ${trans("static:6b95585ef5f442e6922459c81db7c1f3")}`,
        invalidTextValidation: trans("static:5f09f8f54f174ecfb6befd64ca4c3423"),
        serverFormat: "YYYY-MM-DDTHH:mm:ss",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("second").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
        withTime: true,
    },
    default: {
        component: FieldDateMain,
        dateType: "default",
        format: "DD.MM.YYYY",
        formatText: trans("static:acfdddfef80c4e5c90a3052e286d7919"),
        inputMask: "99.99.9999",
        invalidText: (value: string) => `${value} ${trans("static:f0f42f35a2d241f3b51cd16747c37186")}`,
        invalidTextValidation: trans("static:77050515e7b2462e95429b9df33a7958"),
        serverFormat: "YYYY-MM-DDTHH:mm:ss",

        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss").endOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        serverFormatIn: "YYYY-MM-DDTHH:mm:ss",
    },
});

export const getFieldDate = (trans: TFunction, item?: string): IDateConfig =>
    (item && dateMap(trans)[getFieldType(item)]) || dateMap(trans).default;
