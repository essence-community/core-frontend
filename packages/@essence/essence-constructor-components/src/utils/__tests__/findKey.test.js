/* eslint-disable sort-keys */
import {findGetKey, findSetKey, findRulesKey, findGetGlobalKey} from "../findKey";

describe("findKey", () => {
    it("getglobal - findGetKey", () => {
        expect(findGetKey("'cv_short:'||gcv_short||' cv_inn:'||gcv_inn")).toEqual(["gcv_short", "gcv_inn"]);
        expect(findGetKey("g_global")).toEqual(["g_global"]);
        expect(findGetKey("gck_con")).toEqual(["gck_con"]);
        expect(findGetKey("gcv_type||': '||gcv_adress")).toEqual(["gcv_type", "gcv_adress"]);
        expect(findGetKey("cv_short||g_test")).toEqual(["cv_short", "g_test"]);
    });

    it("setglobal - findSetKey", () => {
        expect(
            findSetKey(
                "ck_d_meter_record=gck_d_meter_record,cv_number=gcv_number,cn_indication=g_cn_indication,cd_en=g_cd_en",
            ),
        ).toEqual({
            gckDMeterRecord: "ckDMeterRecord",
            gcvNumber: "cvNumber",
            gCnIndication: "cnIndication",
            gCdEn: "cdEn",
        });
    });

    it("getglobalstorage - findGetGlobalKey", () => {
        expect(findGetGlobalKey("gck_d_service=ck_d_service,gck_org=ck_org")).toEqual({
            ckDService: "gckDService",
            ckOrg: "gckOrg",
        });
        expect(findGetGlobalKey("g_point_id,g_meter_id")).toEqual({
            gPointId: "gPointId",
            gMeterId: "gMeterId",
        });
        expect(findGetGlobalKey("gck_mo_select=gck_mo")).toEqual({
            gckMo: "gckMoSelect",
        });
    });

    it("disabledrules - findRulesKey", () => {
        expect(findRulesKey("g_ck_d_mo == 1 || g_ck_d_mo == 5")).toEqual(["g_ck_d_mo"]);
    });
    it("hiddenrules - findRulesKey", () => {
        expect(findRulesKey("g_meter_record!='indication'")).toEqual(["g_meter_record"]);
        // eslint-disable-next-line quotes
        expect(findRulesKey('!(gck_d_meter_record=="indication" && gcd_en!=null)')).toEqual([
            "gck_d_meter_record",
            "gcd_en",
        ]);
    });
});
