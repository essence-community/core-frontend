export function isEmpty(value: any, allowEmptyString?: boolean): boolean {
    // eslint-disable-next-line no-eq-null
    return value == null || (allowEmptyString ? false : value === "") || (Array.isArray(value) && value.length === 0);
}

export function isDeepEqual(objOld?: any, objNew?: any): boolean {
    if (Array.isArray(objOld) && Array.isArray(objOld)) {
        if (objOld.length != objNew.length) {
            return false;
        }
        for (let i = 0; i < objOld.length; i += 1) {
            if (!isDeepEqual(objOld[i], objNew[i])) {
                return false;
            }
        }
    } else if (typeof objOld == "object" && objOld != null && typeof objNew == "object" && objNew != null) {
        if (Object.keys(objOld).length != Object.keys(objNew).length) {
            return false;
        }
        for (const prop in objOld) {
            if (Object.prototype.hasOwnProperty.call(objNew, prop)) {
                if (!isDeepEqual(objOld[prop], objNew[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }
    } else if (objOld !== objNew) {
        return false;
    }

    return true;
}
