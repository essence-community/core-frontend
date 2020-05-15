import {IBuilderConfig} from "../../types";

export function getWindowDetailColumns(detailBc?: IBuilderConfig[]): IBuilderConfig[] {
    if (!detailBc) {
        return [];
    }

    return (
        detailBc
            .map((panel) => (panel.childs ? panel.childs.map((child) => (child.childs ? child.childs : child)) : []))
            .flat(2)
            .filter((field) => field.type === "IFIELD" || field.type === "IPERIOD")
            // FIELD_OMIT_ATTRIBUTES_AUTOBUILD = ["width", "hiddenrules"];
            // eslint-disable-next-line no-unused-vars
            .map(({width, hiddenrules, ...field}) => field)
    );
}
