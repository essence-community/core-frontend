/* eslint-disable quote-props */
// @flow

import ruRU from "rc-calendar/lib/locale/ru_RU";
import moment from "moment";
import {i18next} from "@essence/essence-constructor-share/utils";
import FieldDateMonth from "./FieldDateMonth";
import FieldDateMain from "./FieldDateMain";
import FieldDateBase from "./FieldDateBase";

const dateTypeMap = {
    "F Y": 2,
    // eslint-disable-next-line id-length
    Y: 1,
    "d.m.Y": 3,
    "d.m.Y H:00": 4,
    "d.m.Y H:i": 5,
    "d.m.Y H:i:s": 6,
};
const getFieldType = (item: string) => {
    if (typeof item === "string") {
        return dateTypeMap[item] || parseInt(item, 10);
    }

    return item;
};

export const dateMap = {
    "1": {
        component: FieldDateBase,
        dateType: "1",
        format: "YYYY",
        formatText: i18next.t("773ed9a089214ab9b0bd149be5685ba0"),
        inputMask: "9999",
        invalidText: (value: string) => `${value} ${i18next.t("271b81793a72461192644b7f4578ac51")}`,
        invalidTextValidation: i18next.t("3c205218305a4a25bada37004775789c"),
        mode: "year",
        serverFormat: "YYYY-01-01T00:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("year")
                .format("YYYY-MM-DDTHH:mm:ss"),
    },
    "2": {
        component: FieldDateMonth,
        dateType: "2",
        format: "MMM YYYY",
        formatText: i18next.t("02983497059143b9b97cc0e7d0c4691d"),
        invalidText: (value: string) => `${value} ${i18next.t("a40a4372823f44ffa7a69e699b0b15db")}`,
        invalidTextValidation: i18next.t("6b6305d16db148d986e782a66c4318da"),
        serverFormat: "YYYY-MM-01T00:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("month")
                .format("YYYY-MM-DDTHH:mm:ss"),
    },
    "3": {
        component: FieldDateMain,
        dateType: "3",
        format: "DD.MM.YYYY",
        formatText: i18next.t("acfdddfef80c4e5c90a3052e286d7919"),
        inputMask: "99.99.9999",
        invalidText: (value: string) => `${value} ${i18next.t("f0f42f35a2d241f3b51cd16747c37186")}`,
        invalidTextValidation: i18next.t("77050515e7b2462e95429b9df33a7958"),
        serverFormat: "YYYY-MM-DDT00:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("day")
                .format("YYYY-MM-DDTHH:mm:ss"),
    },
    "4": {
        component: FieldDateMain,
        dateType: "4",
        format: "DD.MM.YYYY HH:00",
        formatText: i18next.t("149c3a8684224bc2939e613271f5c704"),
        inputMask: "99.99.9999 99:00",
        invalidText: (value: string) => `${value} ${i18next.t("ce35e3e6067d4343af8b30ea38d01f96")}`,
        invalidTextValidation: i18next.t("1583ea7e4b054c759818771219303c3c"),
        serverFormat: "YYYY-MM-DDTHH:00:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("hour")
                .format("YYYY-MM-DDTHH:mm:ss"),
        withTime: true,
    },
    "5": {
        component: FieldDateMain,
        dateType: "5",
        format: "DD.MM.YYYY HH:mm",
        formatText: i18next.t("6b5f29158ba142c3963649e1219a8f1e"),
        inputMask: "99.99.9999 99:99",
        invalidText: (value: string) => `${value} ${i18next.t("c43175882dda4f7abce9bb7325cd8847")}`,
        invalidTextValidation: i18next.t("a1fadf8d7e73453b8a1ed526f3d1103e"),
        serverFormat: "YYYY-MM-DDTHH:mm:00",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("minute")
                .format("YYYY-MM-DDTHH:mm:ss"),
        withTime: true,
    },
    "6": {
        component: FieldDateMain,
        dateType: "6",
        format: "DD.MM.YYYY HH:mm:ss",
        formatText: i18next.t("52f802c6dab84eacbb4e6068aedcaa77"),
        inputMask: "99.99.9999 99:99:99",
        invalidText: (value: string) => `${value} ${i18next.t("6b95585ef5f442e6922459c81db7c1f3")}`,
        invalidTextValidation: i18next.t("5f09f8f54f174ecfb6befd64ca4c3423"),
        serverFormat: "YYYY-MM-DDTHH:mm:ss",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("second")
                .format("YYYY-MM-DDTHH:mm:ss"),
        withTime: true,
    },
    default: {
        component: FieldDateMain,
        dateType: "default",
        format: "DD.MM.YYYY",
        formatText: i18next.t("acfdddfef80c4e5c90a3052e286d7919"),
        inputMask: "99.99.9999",
        invalidText: (value: string) => `${value} ${i18next.t("f0f42f35a2d241f3b51cd16747c37186")}`,
        invalidTextValidation: i18next.t("77050515e7b2462e95429b9df33a7958"),
        serverFormat: "YYYY-MM-DDTHH:mm:ss",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("day")
                .format("YYYY-MM-DDTHH:mm:ss"),
    },
};

export const getFieldDate = (item?: string): Object => (item && dateMap[getFieldType(item)]) || dateMap.default;

export const ru = {...ruRU, ok: "Ок"};
