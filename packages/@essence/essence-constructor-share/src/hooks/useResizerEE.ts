import * as React from "react";

import {EventEmitter} from "eventemitter3";
import {ResizeContext, IResizeEventContext} from "../context";

function initDefault() {
    return new EventEmitter();
}
export function useResizerEE(isNew = false) {
    const [emitter, setEmitter] = React.useState<IResizeEventContext>(initDefault);
    const resizeContext = React.useContext(ResizeContext);

    React.useEffect(() => {
        if (resizeContext && !isNew) {
            setEmitter(resizeContext);
        } else if (resizeContext && isNew) {
            const newEmitter = initDefault();

            resizeContext.on("resize", () => newEmitter.emit("resize"));
            setEmitter(newEmitter);
        } else {
            setEmitter(initDefault());
        }
    }, [resizeContext]);

    return emitter;
}
