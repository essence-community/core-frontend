export function isEmpty(value: any, allowEmptyString?: boolean): boolean {
    // eslint-disable-next-line no-eq-null
    return value == null || (allowEmptyString ? false : value === "") || (Array.isArray(value) && value.length === 0);
}
