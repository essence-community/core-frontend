import * as React from "react";
export function useShowRef<T>(): [React.MutableRefObject<T>, boolean, React.Ref<T>] {
    const ref = React.useRef<T>(null);
    const [isMounted, setMounted] = React.useState(false);
    const handleRef = React.useCallback((node) => {
        ref.current = node;
        setMounted(node?true:false);
    }, []);
    return [ref, isMounted, handleRef];
}