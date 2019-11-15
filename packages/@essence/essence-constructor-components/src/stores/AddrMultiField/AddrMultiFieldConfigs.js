// @flow
import {mergeComponents} from "../../utils/builder";
import {type BuilderFieldType} from "../../TextField/BuilderFieldType";

export const getAreaFieldConfig = (bc: BuilderFieldType) => ({
    ckPageObject: `area_${bc.ckPageObject}`,
    ckQuery: "jNSIGetAddrArea",
    clearfield: "ck_street,ck_house",
    column: "ck_area",
    cvDisplayed: "d0e89e0caa6c476e87fb9564ca0d45ac",
    datatype: "combo",
    disabledrules: `!g_${bc.ckPageObject}_ck_region`,
    displayfield: "cv_area",
    getglobaltostore: `g_${bc.ckPageObject}_ck_region=ck_region`,
    minchars: "4",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_area",
    required: "true",
    selfclean: "true",
    setglobal: `g_${bc.ckPageObject}_ck_area,g_${bc.ckPageObject}_ck_master`,
    type: "IFIELD",
    valuefield: "ck_area",
});

export const getRegionFieldConfig = (bc: BuilderFieldType) => ({
    ckPageObject: `region_${bc.ckPageObject}`,
    ckQuery: "jNSIGetAddrRegion",
    clearfield: "ck_area,ck_street,ck_house",
    column: "ck_region",
    cvDisplayed: "dd72982c8ecd46e094823c088e2aa91e",
    datatype: "combo",
    displayfield: "cv_region",
    minchars: "4",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_region",
    required: "true",
    selfclean: "true",
    setglobal: `g_${bc.ckPageObject}_ck_region`,
    type: "IFIELD",
    valuefield: "ck_region",
});

export const getStreetFieldConfig = (bc: BuilderFieldType) => ({
    ckPageObject: `street_${bc.ckPageObject}`,
    ckQuery: "jNSIGetAddrStreet",
    clearfield: "ck_house",
    column: "ck_street",
    cvDisplayed: "efdf47b812344d3aaa5228520f04a04e",
    datatype: "combo",
    disabledrules: `!g_${bc.ckPageObject}_ck_area`,
    displayfield: "cv_street",
    getglobaltostore: [`g_${bc.ckPageObject}_ck_area=ck_area`, `g_${bc.ckPageObject}_ck_region=ck_region`].join(","),
    minchars: "4",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_street",
    selfclean: "true",
    setglobal: `g_${bc.ckPageObject}_ck_street`,
    type: "IFIELD",
    valuefield: "ck_street",
});

export const getHouseFieldConfig = (bc: BuilderFieldType) => ({
    ckPageObject: `house_${bc.ckPageObject}`,
    ckQuery: "jNSIGetAddrHouse",
    column: "ck_house",
    cvDisplayed: "c215efe4c3254c9690a5d0744c0a89b4",
    datatype: "combo",
    disabledrules: `!g_${bc.ckPageObject}_ck_area`,
    displayfield: "cv_house",
    getglobaltostore: [
        `g_${bc.ckPageObject}_ck_area=ck_area`,
        `g_${bc.ckPageObject}_ck_region=ck_region`,
        `g_${bc.ckPageObject}_ck_street=ck_street`,
    ].join(","),
    minchars: "1",
    noglobalmask: "true",
    querydelay: "1",
    querymode: "remote",
    queryparam: "cv_house",
    searchValues: ["ckArea", "cvRegion", "ckStreet"],
    selfclean: "true",
    type: "IFIELD",
    valuefield: "ck_house",
});

export const getAddrMultiFieldConfig = (bc: BuilderFieldType) => {
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
    ];
};
