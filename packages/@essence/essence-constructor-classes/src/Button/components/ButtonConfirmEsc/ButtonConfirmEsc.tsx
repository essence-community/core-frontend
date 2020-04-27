import * as React from "react";
import keycode from "keycode";
import {IPageModel} from "@essence-community/constructor-share";

interface IButtonConfirmEscProps {
    open: boolean;
    pageStore: IPageModel;
    onOpen: (event: React.SyntheticEvent) => void;
}

export const ButtonConfirmEsc: React.FC<IButtonConfirmEscProps> = (props) => {
    const {onOpen, pageStore, open} = props;

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (keycode(event) === "esc" && !pageStore.hiddenPage && !open) {
                // @ts-ignore
                onOpen(event);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onOpen, open, pageStore.hiddenPage]);

    return null;
};
