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

export function decodePathUrl<T = any>(filter: string, elseErrorValue?: T): T | undefined {
    if (!filter) {
        return elseErrorValue;
    }
    try {
        return JSON.parse(decodeURIComponent(escape(window.atob(decodeURIComponent(filter)))));
    } catch (err) {
        if (typeof elseErrorValue !== "undefined") {
            return elseErrorValue;
        } else {
            throw err;
        }
    }
}
export function encodePathUrl<T = any>(filter: T): string {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(filter)))));
}

export function orderedObject(unordered: Record<string, any>): Record<string, any> {
    return Object.keys(unordered)
        .sort()
        .reduce((obj, key) => {
            obj[key] = unordered[key];

            return obj;
        }, {} as Record<string, any>);
}
