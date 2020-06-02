import {IBuilderConfig, IPageModel, IRecord} from "../../types";
import {VAR_RECORD_DISPLAYED} from "../../constants";
import {getWindowValidChild} from "./getWindowValidChild";
import {getWindowDetailColumns} from "./getWindowDetailColumns";

interface IGetWindowChildsProps {
    windowBc: IBuilderConfig;
    pageStore: IPageModel;
    values?: IRecord;
    autobuild?: boolean;
}

// FIELD_OMIT_ATTRIBUTES_AUTOBUILD = ["width", "hiddenrules"];
function omitAttributesAutobuild(fieldBc: IBuilderConfig): IBuilderConfig {
    // eslint-disable-next-line no-unused-vars
    const {width, hiddenrules, ...rest} = fieldBc;

    return rest;
}

export function getWindowChilds({windowBc, pageStore, values, autobuild}: IGetWindowChildsProps): IBuilderConfig[] {
    if (!windowBc.columns) {
        return [];
    }

    const childs = windowBc.columns.map((field: IBuilderConfig) => {
        const fieldProps =
            field.editors && field.editors !== "false" && field.editors.length > 0
                ? getWindowValidChild(field.editors, pageStore, values)
                : field;

        return {
            // CORE-1430: Для FieldPeriod не должно быть column: undefined
            ...(field.column ? {column: field.column} : {}),
            editmode: field.editmode,

            ...(autobuild ? omitAttributesAutobuild(fieldProps) : fieldProps),
            // eslint-disable-next-line sort-keys
            [VAR_RECORD_DISPLAYED]: field[VAR_RECORD_DISPLAYED],
            edittype: windowBc.edittype,
            ...(field.required ? {required: field.required} : {}),
            ...(windowBc.edittype === "inline" ? {width: "100%"} : {}),
            type: fieldProps.type === "COLUMN" ? "IFIELD" : fieldProps.type,
        };
    });

    if (windowBc.edittype !== "inline") {
        return [...childs, ...getWindowDetailColumns(windowBc.detail)];
    }

    return childs;
}
