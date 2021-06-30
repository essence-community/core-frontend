import {IBuilderConfig, IRecord} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants";

type DataType =
    | "enum"
    | "text"
    | "localization"
    | "numeric"
    | "boolean"
    | "cssmeasure"
    | "computed"
    | "order"
    | "global"
    | "integer";

interface IProperty {
    ck_attr: keyof IBuilderConfig;
    ck_d_data_type: DataType;

    cv_data_type_extra: null | string[];
}

const FIELDS: Record<DataType, Partial<IBuilderConfig>> = {
    boolean: {
        datatype: "boolean",
        reqsel: true,
    },
    computed: {},
    cssmeasure: {},
    enum: {
        autoload: true,
        datatype: "combo",
        displayfield: "ck_id",
        getmastervalue: [{in: "ck_id", out: "ck_id"}],
    },
    global: {},
    integer: {
        datatype: "integer",
        minvalue: "-100000",
    },
    localization: {
        allownew: "new:",
        autoload: true,
        datatype: "combo",
        getglobaltostore: [{in: "g_sys_lang", out: null}],
        maxsize: "4000",
        minchars: 0,
        pagesize: 100,
        querymode: "remote",
        reqsel: true,
        valuefield: [{in: "ck_id", out: null}],
    },
    numeric: {
        datatype: "numeric",
        decimalprecision: 2,
        maxsize: "60",
        minvalue: "-100000",
        reqsel: true,
        required: false,
    },
    order: {},
    text: {},
};

export function createPropertyForm(
    bc: IBuilderConfig,
    properties: IProperty[],
    propertiesBc: IBuilderConfig,
): IBuilderConfig {
    const formObjectId = `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_form`;
    const winObjectId = `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_win`;

    const fields = [{ck_attr: "cv_displayed"}, ...properties].map(
        (property: IProperty): IBuilderConfig => ({
            [VAR_RECORD_DISPLAYED]: property.ck_attr,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${formObjectId}_${property.ck_attr}`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            column: property.ck_attr,
            datatype: "text",
            displayfield: property.ck_attr,
            order: [{direction: "ASC", property: property.ck_attr}],
            queryparam: property.ck_attr,
            type: "IFIELD",
            ...FIELDS[property.ck_d_data_type],
        }),
    );
    const propertyPanel: IBuilderConfig = {
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_PAGE_OBJECT_ID]: formObjectId,
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        childs: fields,
        records: [(propertiesBc as any) as IRecord],
        type: "GUI_EDITOR_PROPERTY",
    };

    return {
        [VAR_RECORD_PAGE_OBJECT_ID]: winObjectId,
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        align: "right",
        childs: [propertyPanel],
        height: "100%",
        top: 45,
        type: "WIN.DRAWER",
        width: "30%",
    };
}
