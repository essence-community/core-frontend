import * as React from "react";
import {ProjectContext} from "@essence-community/constructor-share/context";

export const KeyboardStatusManager: React.FC = () => {
    const projectStore = React.useContext(ProjectContext);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const {keyCode} = event;

            if (projectStore && projectStore.keyboardState.lastKeyCode !== keyCode) {
                projectStore.setKeyboardState({
                    keyCodes: [keyCode, ...projectStore.keyboardState.keyCodes],
                    lastKeyCode: event.keyCode,
                });
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {
            const {keyCode} = event;

            if (projectStore) {
                const {keyboardState} = projectStore;
                const keyCodes = keyboardState.keyCodes.filter((key) => key !== keyCode);
                const lastKeyCode = keyCodes.includes(keyboardState.lastKeyCode)
                    ? keyboardState.lastKeyCode
                    : keyCodes[0];

                projectStore.setKeyboardState({
                    keyCodes,
                    lastKeyCode,
                });
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [projectStore]);

    return null;
};
