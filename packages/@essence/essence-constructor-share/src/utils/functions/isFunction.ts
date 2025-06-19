 
export function isFunction(value: any): value is Function {
    return value && {}.toString.call(value) === "[object Function]";
}
