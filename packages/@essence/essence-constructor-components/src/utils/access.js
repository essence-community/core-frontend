// @flow

export function checkEditable(mode: string, editmode: string = "all"): boolean {
    if (editmode === "all") {
        return true;
    }

    if ((mode === "1" && editmode === "insert") || (mode === "2" && editmode === "update")) {
        return true;
    }

    return false;
}
