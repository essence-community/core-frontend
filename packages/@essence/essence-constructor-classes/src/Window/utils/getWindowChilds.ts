import {IBuilderConfig, IBuilderMode} from "@essence-community/constructor-share/types";

export function getWindowChilds(mode: IBuilderMode, childs?: IBuilderConfig[]): IBuilderConfig[] {
    if (!childs) {
        return [];
    }

    return childs.reduce<IBuilderConfig[]>((childsAcc, child) => {
        const {editmode} = child;

        switch (true) {
            case editmode === undefined:
            case editmode === "all":
            case mode === "1" && (editmode === "insert-editing" || editmode === "insert"):
            case mode === "2" && (editmode === "update-editing" || editmode === "update"):
                childsAcc.push(child);
                break;
            case editmode === "disabled":
            case mode === "1" && editmode === "update-editing":
            case mode === "2" && editmode === "insert-editing":
                // Hide field if mode for *-editing
                childsAcc.push({
                    ...child,
                    disabled: true,
                });
                break;
            default:
            // do nothing
        }

        return childsAcc;
    }, []);
}
