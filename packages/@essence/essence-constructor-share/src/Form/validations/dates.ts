import moment from "moment";
import {IField} from "../types";
import {TFunction} from "../../utils";

export function date1(field: IField) {
    const {value} = field;

    if (value && value !== "defaultvaluequery" && typeof value !== "boolean" && !moment(value).isValid()) {
        return function(trans: TFunction) {
            return trans("static:3c205218305a4a25bada37004775789c").replace(":inputValue", String(value));
        };
    }

    return undefined;
}

export function date2(field: IField) {
    const {value} = field;

    if (value && value !== "defaultvaluequery" && typeof value !== "boolean" && !moment(value).isValid()) {
        return function(trans: TFunction) {
            return trans("static:6b6305d16db148d986e782a66c4318da").replace(":inputValue", String(value));
        };
    }

    return undefined;
}

// Default
export function date3(field: IField) {
    const {value} = field;

    if (value && value !== "defaultvaluequery" && typeof value !== "boolean" && !moment(value).isValid()) {
        return function(trans: TFunction) {
            return trans("static:77050515e7b2462e95429b9df33a7958").replace(":inputValue", String(value));
        };
    }

    return undefined;
}

export function date4(field: IField) {
    const {value} = field;

    if (value && value !== "defaultvaluequery" && typeof value !== "boolean" && !moment(value).isValid()) {
        return function(trans: TFunction) {
            return trans("static:1583ea7e4b054c759818771219303c3c").replace(":inputValue", String(value));
        };
    }

    return undefined;
}

export function date5(field: IField) {
    const {value} = field;

    if (value && value !== "defaultvaluequery" && typeof value !== "boolean" && !moment(value).isValid()) {
        return function(trans: TFunction) {
            return trans("static:a1fadf8d7e73453b8a1ed526f3d1103e").replace(":inputValue", String(value));
        };
    }

    return undefined;
}

export function date6(field: IField) {
    const {value} = field;

    if (value && value !== "defaultvaluequery" && typeof value !== "boolean" && !moment(value).isValid()) {
        return function(trans: TFunction) {
            return trans("static:5f09f8f54f174ecfb6befd64ca4c3423").replace(":inputValue", String(value));
        };
    }

    return undefined;
}
