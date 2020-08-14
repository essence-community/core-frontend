/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
export function isFunction(value: any): value is Function  {
    return value && {}.toString.call(value) === "[object Function]";
}
