import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {getComponent} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share";

const KEY_CHILDS = ["childs", "btns", "filters"];

export const patchChilds = (childs: IBuilderConfig[]): IBuilderConfig[] => {
    return childs.map(
        (child: IBuilderConfig): IBuilderConfig => {
            const childType = child.datatype ? `${child.type}.${child.datatype}` : child.type;
            const elementType = `${childType}.GUI_ELEMENT`;
            const component = getComponent(elementType);

            KEY_CHILDS.forEach((key) => {
                if (Array.isArray(child[key])) {
                    child[key] = patchChilds(child[key]);
                }
            });

            if (component) {
                child.type = elementType;
            }

            return {
                [VAR_RECORD_PAGE_OBJECT_ID]: `${child[VAR_RECORD_PAGE_OBJECT_ID]}_GUI_ELEMENT`,
                [VAR_RECORD_PARENT_ID]: child[VAR_RECORD_PARENT_ID],
                childs: [child],
                type: "GUI_EDITOR_ELEMENT",
            };
        },
    );
};
