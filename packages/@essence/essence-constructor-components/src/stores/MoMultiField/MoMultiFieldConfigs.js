// @flow
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_CK_D_ENDPOINT,
} from "@essence-community/constructor-share/constants";
import {mergeComponents} from "../../utils/builder";
import {type BuilderFieldType} from "../../TextField/BuilderFieldType";

export const getAreaFieldConfig = (bc: BuilderFieldType) => ({
    [VAR_RECORD_DISPLAYED]: "static:d0e89e0caa6c476e87fb9564ca0d45ac",
    [VAR_RECORD_PAGE_OBJECT_ID]: `area_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrArea",
    clearfield: "ck_street,ck_house",
    column: "ck_area",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`,
    displayfield: "cv_area",
    getglobaltostore: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region=ck_region`,
    minchars: "4",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_area",
    reloadfield: `mo_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    required: "true",
    selfclean: "true",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area,g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    type: "IFIELD",
    valuefield: "ck_area",
});

export const getRegionFieldConfig = (bc: BuilderFieldType) => ({
    [VAR_RECORD_DISPLAYED]: "static:dd72982c8ecd46e094823c088e2aa91e",
    [VAR_RECORD_PAGE_OBJECT_ID]: `region_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrRegion",
    clearfield: "ck_area,ck_street,ck_house",
    column: "ck_region",
    datatype: "combo",
    displayfield: "cv_region",
    minchars: "4",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_region",
    reloadfield: `mo_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    required: "true",
    selfclean: "true",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region`,
    type: "IFIELD",
    valuefield: "ck_region",
});

export const getStreetFieldConfig = (bc: BuilderFieldType) => ({
    [VAR_RECORD_DISPLAYED]: "static:efdf47b812344d3aaa5228520f04a04e",
    [VAR_RECORD_PAGE_OBJECT_ID]: `street_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrStreet",
    clearfield: "ck_house",
    column: "ck_street",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`,
    displayfield: "cv_street",
    getglobaltostore: [
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area=ck_area`,
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region=ck_region`,
    ].join(","),
    minchars: "4",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_street",
    reloadfield: `mo_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    selfclean: "true",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_street,g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    type: "IFIELD",
    valuefield: "ck_street",
});

export const getHouseFieldConfig = (bc: BuilderFieldType) => ({
    [VAR_RECORD_DISPLAYED]: "static:c215efe4c3254c9690a5d0744c0a89b4",
    [VAR_RECORD_PAGE_OBJECT_ID]: `house_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_QUERY_ID]: "jNSIGetAddrHouse",
    column: "ck_house",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`,
    displayfield: "cv_house",
    getglobaltostore: [
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area=ck_area`,
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_street=ck_street`,
        `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_region=ck_region`,
    ].join(","),
    minchars: "1",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_house",
    reloadfield: `mo_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    selfclean: "true",
    setglobal: `g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    type: "IFIELD",
    valuefield: "ck_house",
});

export const getMoFieldConfig = (bc: BuilderFieldType) => ({
    [VAR_RECORD_CK_D_ENDPOINT]: bc[VAR_RECORD_CK_D_ENDPOINT],
    [VAR_RECORD_DISPLAYED]: "static:1dabbff97463462f9776c1c62160c0ed",
    [VAR_RECORD_MASTER_ID]: `house_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `mo_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
    [VAR_RECORD_QUERY_ID]: "MOShowMOsByAddress",
    autoload: "false",
    column: "ck_id",
    datatype: "combo",
    disabledrules: `!g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_area`,
    displayfield: "cv_name",
    idproperty: `ck_id=g_${bc[VAR_RECORD_PAGE_OBJECT_ID]}_ck_master`,
    minchars: "0",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_name",
    required: "true",
    selfclean: "true",
    type: "IFIELD",
    valuefield: "ck_id",
});

export const getMoMultiFieldConfig = (bc: BuilderFieldType) => {
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
};
