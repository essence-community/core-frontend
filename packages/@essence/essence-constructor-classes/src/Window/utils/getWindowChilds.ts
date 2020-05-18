import {IBuilderConfig, IBuilderMode} from "@essence-community/constructor-share/types";
import {checkEditable} from "./checkEditable";

export function getWindowChilds(mode: IBuilderMode, childs?: IBuilderConfig[]): IBuilderConfig[] {
    if (!childs) {
        return [];
    }

    return childs.reduce<IBuilderConfig[]>((childsAcc, child) => {
        const isDisabled = !checkEditable(mode as IBuilderMode, child.editmode);

        if (isDisabled && child.visibleinwindow === "false") {
            return childsAcc;
        }

        if (isDisabled) {
            childsAcc.push({
                ...child,
                disabled: "true",
            });
        } else {
            childsAcc.push(child);
        }

        return childsAcc;
    }, []);
}
