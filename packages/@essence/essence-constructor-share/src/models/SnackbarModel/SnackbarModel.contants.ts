/* eslint-disable sort-keys */
/* eslint-disable quote-props */
export const CODE_GROUP_MAP = {
    "-1": "1*",
    "102": "1*",
    "103": 1,
    "104": 2,
    "105": 1,
    "107": 1,
    "108": 1,
    "201": 3,
    "202": 2,
    "203": 9,
    "204": 2,
    "205": 2,
    "207": 5,
    "208": 7,
    "300": 6,
    "301": "1*",
    "302": 8,
    "403": 9,
    "500": "1*",
    "513": 9,
    "999": 10,
};

export const GROUP_ACTION_MAP = {
    "1": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorDetails",
    },
    "1*": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorDetails",
    },
    "2": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorMask",
    },
    "3": {
        DEV: "invalidSession",
        PROD: "invalidSession",
        TEST: "invalidSession",
    },
    "4": {
        DEV: "loginFailed",
        PROD: "loginFailed",
        TEST: "loginFailed",
    },
    "5": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorDetails",
    },
    "6": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorMask",
    },
    "7": {
        DEV: "errorResponse",
        PROD: "errorRemoteAuth",
        TEST: "errorRemoteAuth",
    },
    "8": {
        DEV: "errorMoveResponse",
        PROD: "errorMoveResponse",
        TEST: "errorMoveResponse",
    },
    "9": {
        DEV: "accessDenied",
        PROD: "accessDenied",
        TEST: "accessDenied",
    },
    "10": {
        DEV: "reinitSession",
        PROD: "reinitSession",
        TEST: "reinitSession",
    },
};
/* eslint-enable quote-props */

export const CREATE_AT_FORMAT = "DD.MM.YYYY, HH:mm";
export const MAX_OPENED_SNACKBARS = 5;
export const CODE_ACCESS_DENIEND = "513";
