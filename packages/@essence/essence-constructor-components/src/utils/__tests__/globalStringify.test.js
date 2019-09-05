import {toStringGlobal} from "../globalStringify";

describe("globalStringify", () => {
    it("toStringGlobal", () => {
        expect(toStringGlobal("'cv_short:'||gcv_short||' cv_inn:'||gcv_inn")).toBe(
            "'cv_short:' + gcv_short + ' cv_inn:' + gcv_inn",
        );
        expect(toStringGlobal("g_global")).toBe("g_global");
        expect(toStringGlobal("gck_con")).toBe("gck_con");
        expect(toStringGlobal("gcv_type||': '||gcv_adress")).toBe("gcv_type + ': ' + gcv_adress");
        expect(toStringGlobal("cv_short||g_test")).toBe("cv_short + g_test");
    });
});
