/* eslint-disable sort-keys */
import {TFunction} from "@essence-community/constructor-share/utils";
import {toTranslateText} from "@essence-community/constructor-share/utils/transform";

export function toLocale(trans: TFunction) {
    return {
        today: toTranslateText(trans, "static:36cb0beb301d467a9db8e8e7d2383da3"),
        now: toTranslateText(trans, "static:aa61a7fd162846e09ee931d39a8fa03f"),
        backToToday: toTranslateText(trans, "static:954505d8a7d740fe8bf76e3cf06ef898"),
        ok: toTranslateText(trans, "static:8004527cce454f8f83c7d739460f5822"),
        clear: toTranslateText(trans, "static:c59a78d73c914073afe70802f0fae2fd"),
        month: toTranslateText(trans, "static:8c949483dfb14758b795cd7ee55cacc0"),
        year: toTranslateText(trans, "static:301a776e6b6341c29339282f1dee9d8f"),
        timeSelect: toTranslateText(trans, "static:7426f6ea435b4341af5f9fcc40158f5d"),
        dateSelect: toTranslateText(trans, "static:546d8902e79b47db827cdadf04df383a"),
        monthSelect: toTranslateText(trans, "static:9b725b9abc42454ab717c6e5227122a5"),
        yearSelect: toTranslateText(trans, "static:84956bf9e0a44fa58e34c538f92473a3"),
        decadeSelect: toTranslateText(trans, "static:82b334d3e0b74459b3d1362344920d74"),
        yearFormat: toTranslateText(trans, "static:5cc2e62d672e4f698c1707221ffb29ef"),
        dateFormat: toTranslateText(trans, "static:c4687c6bb79e48aa8898d62d65f7b081"),
        dayFormat: toTranslateText(trans, "static:1bc42c0b876c40a3b601d5b8b63517c4"),
        dateTimeFormat: toTranslateText(trans, "static:deece5fcda5247a793d5e3ed54e05593"),
        monthBeforeYear: toTranslateText(trans, "static:4b15fb094f164e5b9b39cfb9e7abc809") === "true",
        previousMonth: toTranslateText(trans, "static:f4e21fd3f2824dfa9d8f120b2b0a9705"),
        nextMonth: toTranslateText(trans, "static:914c30e709ca47e0961c6a5b34a141a7"),
        previousYear: toTranslateText(trans, "static:ea43acee3f454d1e9c5c0afa1a2f3c22"),
        nextYear: toTranslateText(trans, "static:5def211033c3430392621f6c530e418d"),
        previousDecade: toTranslateText(trans, "static:11c8e521d1e74313826367d328cd1c92"),
        nextDecade: toTranslateText(trans, "static:2b4d49c7238c4c2b8084279eb406730c"),
        previousCentury: toTranslateText(trans, "static:82825a8b65a84e6abf3637c9f1a3de39"),
        nextCentury: toTranslateText(trans, "static:9d105387e4e140f898d5abd0fd8a4db6"),
    };
}
