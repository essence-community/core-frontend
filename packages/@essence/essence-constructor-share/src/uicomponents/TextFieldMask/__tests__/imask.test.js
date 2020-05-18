import {extendValidMask, getRegexFromImask} from "../imask";

describe("imask", () => {
    it("extendValidMask - valid", () => {
        [
            ["IVX-ВВ", "RRR-ББ", true],
            ["IVX-В", "RRR-ББ", true],
            ["IVX", "RRR-ББ", true],
            ["I-ВВ", "R-ББ", true],
            ["IVXXVVI-ГГ", "R-ББ", false],
        ].forEach(([value, newImask, valid]) => {
            expect(
                extendValidMask({
                    imask: "R-ББ",
                    oldImask: "R-ББ",
                    regex: getRegexFromImask("R-ББ"),
                    value,
                }),
            ).toEqual({newImask, valid});
        });
    });
});
