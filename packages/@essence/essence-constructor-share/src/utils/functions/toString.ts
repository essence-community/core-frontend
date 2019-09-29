export function toString(value: never): string {
    // eslint-disable-next-line no-eq-null
    return value == null || value === undefined ? "" : String(value);
}
