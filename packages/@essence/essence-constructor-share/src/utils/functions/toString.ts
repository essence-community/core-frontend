export function toString(value: any): string {
    // eslint-disable-next-line no-eq-null
    return value == null || value === undefined ? "" : String(value);
}
