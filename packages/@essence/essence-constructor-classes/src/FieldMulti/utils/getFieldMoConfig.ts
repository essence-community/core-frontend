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
    minchars: "4",
    noglobalmask: true,
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_region",
    required: "true",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`,
    type: "IFIELD",
    valuefield: "ck_region",
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
    getglobaltostore: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region=ck_region`,
    minchars: "4",
    noglobalmask: true,
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_area",
    required: "true",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area,g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    type: "IFIELD",
    valuefield: "ck_area",
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
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area=ck_area`,
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region=ck_region`,
    ].join(","),
    minchars: "4",
    noglobalmask: true,
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_street",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_street`,
    type: "IFIELD",
    valuefield: "ck_street",
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
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area=ck_area`,
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region=ck_region`,
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_street=ck_street`,
    ].join(","),
    minchars: "1",
    noglobalmask: true,
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_house",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    type: "IFIELD",
    valuefield: "ck_house",
});

export const getMoFieldConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:1dabbff97463462f9776c1c62160c0ed",
    [VAR_RECORD_MASTER_ID]: `house_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `mo_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_QUERY_ID]: "MOShowMOsByAddress",
    autoload: false,
    column: "ck_id",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`,
    displayfield: "cv_name",
    getmastervalue: `ck_id=g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    idproperty: "ck_id",
    minchars: "0",
    noglobalmask: true,
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_name",
    required: "true",
    type: "IFIELD",
    valuefield: "ck_id",
});

export function getFieldMoConfig(bc: IBuilderConfig): IBuilderConfig[] {
    const {overrides} = mergeComponents(
        bc.childs,
        {
            "Override Area Field": getAreaFieldConfig(bc),
            "Override House Field": getHouseFieldConfig(bc),
            "Override Mo Field": getMoFieldConfig(bc),
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
                "reloadfield",
                "setglobal",
                "column",
                "selfclean",
                "datatype",
            ],
            include: [
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
        overrides["Override Mo Field"],
    ];
}
