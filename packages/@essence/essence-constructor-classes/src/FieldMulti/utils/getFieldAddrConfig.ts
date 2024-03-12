import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {mergeComponents} from "@essence-community/constructor-share/utils";

export const getRegionFieldConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:dd72982c8ecd46e094823c088e2aa91e",
    [VAR_RECORD_PAGE_OBJECT_ID]: `region_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrRegion",
    column: "ck_region",
    datatype: "combo",
    displayfield: "cv_region",
    idproperty: "ck_region",
    minchars: 4,
    noglobalmask: true,
    querydelay: 1,
    querymode: "remote",
    queryparam: "cv_region",
    required: true,
    setglobal: [{in: "ck_region", out: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`}],
    type: "IFIELD",
    valuefield: [{in: "ck_region"}],
});

export const getAreaFieldConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:d0e89e0caa6c476e87fb9564ca0d45ac",
    [VAR_RECORD_MASTER_ID]: `region_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `area_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrArea",
    column: "ck_area",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`,
    displayfield: "cv_area",
    getglobaltostore: [{in: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`, out: "ck_region"}],
    getmastervalue: [{in: "ck_region", out: "ck_region"}],
    idproperty: "ck_area",
    minchars: 4,
    noglobalmask: true,
    querydelay: 1,
    querymode: "remote",
    queryparam: "cv_area",
    required: true,
    setglobal: [
        {in: "ck_area", out: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`},
        {in: "ck_area", out: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`},
    ],
    type: "IFIELD",
    valuefield: [{in: "ck_area"}],
});

export const getStreetFieldConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:efdf47b812344d3aaa5228520f04a04e",
    [VAR_RECORD_MASTER_ID]: `area_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `street_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrStreet",
    column: "ck_street",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`,
    displayfield: "cv_street",
    getglobaltostore: [
        {in: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`, out: "ck_area"},
        {in: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`, out: "ck_region"},
    ],
    getmastervalue: [{in: "ck_area", out: "ck_area"}],
    idproperty: "ck_street",
    minchars: 4,
    noglobalmask: true,
    querydelay: 1,
    querymode: "remote",
    queryparam: "cv_street",
    setglobal: [{in: "ck_street", out: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_street`}],
    type: "IFIELD",
    valuefield: [{in: "ck_street"}],
});

export const getHouseFieldConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:c215efe4c3254c9690a5d0744c0a89b4",
    [VAR_RECORD_MASTER_ID]: `street_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `house_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrHouse",
    column: "ck_house",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`,
    displayfield: "cv_house",
    getglobaltostore: [
        {in: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`, out: "ck_area"},
        {in: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`, out: "ck_region"},
        {in: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_street`, out: "ck_street"},
    ],
    getmastervalue: [{in: "ck_street", out: "ck_street"}],
    idproperty: "ck_house",
    minchars: 1,
    noglobalmask: true,
    querydelay: 1,
    querymode: "remote",
    queryparam: "cv_house",
    setglobal: [{in: "ck_house", out: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`}],
    type: "IFIELD",
    valuefield: [{in: "ck_house"}],
});

export function getFieldAddrConfig(bc: IBuilderConfig): IBuilderConfig[] {
    const {overrides} = mergeComponents(
        bc.childs,
        {
            "Override Area Field": getAreaFieldConfig(bc),
            "Override House Field": getHouseFieldConfig(bc),
            "Override Region Field": getRegionFieldConfig(bc),
            "Override Street Field": getStreetFieldConfig(bc),
        },
        {
            exclude: [
                "disabledrules",
                "disabled",
                "hidden",
                "hiddenrules",
                "getglobaltostore",
                "getmastervalue",
                "setglobal",
                "column",
                "datatype",
            ],
            include: [
                VAR_RECORD_DISPLAYED,
                VAR_RECORD_QUERY_ID,
                "defaultvalue",
                "defaultvaluequery",
                "pagesize",
                "minchars",
                "info",
                "querydelay",
                "displayfield",
                "getglobal",
            ],
        },
    );

    return [
        overrides["Override Region Field"],
        overrides["Override Area Field"],
        overrides["Override Street Field"],
        overrides["Override House Field"],
    ];
}
