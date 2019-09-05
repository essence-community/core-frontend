// @flow
import isObject from "lodash/isObject";
import {loggerRoot} from "../constants";

const logger = loggerRoot.extend("diff");

const diff = (obj1?: Object, obj2?: Object) => {
    if (!isObject(obj1) || !isObject(obj2)) {
        return logger("Invalid argument. Function given, object expected.");
    }

    const diffObject = {};

    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            diffObject[key] = ["key", obj1[key], obj2[key]];
        }
    }

    for (const key in obj2) {
        if (obj1[key] !== obj2[key]) {
            diffObject[key] = [key, obj1[key], obj2[key]];
        }
    }

    return diffObject;
};

export default diff;
