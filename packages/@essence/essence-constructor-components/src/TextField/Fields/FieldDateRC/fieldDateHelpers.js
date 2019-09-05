/* eslint-disable quote-props */
// @flow

import ruRU from "rc-calendar/lib/locale/ru_RU";
import moment from "moment";
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
        formatText: "Формат даты: 'гггг'",
        inputMask: "9999",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'гггг'`,
        invalidTextValidation: ":inputValue не является правильной датой - дата должна быть указана в формате 'гггг'",
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
        formatText: "Формат даты: 'ммм гггг'",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'ммм гггг'`,
        invalidTextValidation:
            ":inputValue не является правильной датой - дата должна быть указана в формате 'ммм гггг'",
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
        formatText: "Формат даты: 'дд.мм.гггг'",
        inputMask: "99.99.9999",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг'`,
        invalidTextValidation:
            ":inputValue не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг'",
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
        formatText: "Формат даты: 'дд.мм.гггг чч:00'",
        inputMask: "99.99.9999 99:00",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг чч:00'`,
        invalidTextValidation:
            ":inputValue не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг чч:00'",
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
        formatText: "Формат даты: 'дд.мм.гггг чч:ми'",
        inputMask: "99.99.9999 99:99",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг чч:ми'`,
        invalidTextValidation:
            ":inputValue не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг чч:ми'",
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
        formatText: "Формат даты: 'дд.мм.гггг чч:ми:сс'",
        inputMask: "99.99.9999 99:99:99",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг чч:ми:сс'`,
        invalidTextValidation:
            ":inputValue не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг чч:ми:сс''",
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
        formatText: "Формат даты: 'дд.мм.гггг'",
        inputMask: "99.99.9999",
        invalidText: (value: string) =>
            `${value} не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг'`,
        invalidTextValidation:
            ":inputValue не является правильной датой - дата должна быть указана в формате 'дд.мм.гггг'",
        serverFormat: "YYYY-MM-DDTHH:mm:ss",
        serverFormatEnd: (value: string) =>
            moment(value, "YYYY-MM-DDTHH:mm:ss")
                .endOf("day")
                .format("YYYY-MM-DDTHH:mm:ss"),
    },
};

export const getFieldDate = (item?: string): Object => (item && dateMap[getFieldType(item)]) || dateMap.default;

export const ru = {...ruRU, ok: "Ок"};
