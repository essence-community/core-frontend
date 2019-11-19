import {parse} from "../parser";

const getValue = (name: string) => name;

// eslint-disable-next-line max-statements
describe("parse", () => {
    it("operator !", () => {
        expect(parse("!false").runer({get: getValue})).toBe(true);
    });
    it("operator !=", () => {
        expect(parse("false != true").runer({get: getValue})).toBe(true);
    });
    it("operator !==", () => {
        expect(parse("false !== true").runer({get: getValue})).toBe(true);
    });
    it("operator &&", () => {
        expect(parse("'one' && 'two' && 'three' && 'four'").runer({get: getValue})).toBe("four");
    });
    it("operator +", () => {
        expect(parse("1234 + 342 + 412 + 12").runer({get: getValue})).toBe(2000);
    });
    it("operator >", () => {
        expect(parse("100 > 20").runer({get: getValue})).toBe(true);
    });
    it("operator <", () => {
        expect(parse("5000 < 2").runer({get: getValue})).toBe(false);
    });
    it("operator ==", () => {
        expect(parse("'' == null").runer({get: getValue})).toBe(false);
    });
    it("operator ===", () => {
        expect(parse("'1' === 1").runer({get: getValue})).toBe(false);
    });
    it("operator ||", () => {
        expect(parse("false || 'two'").runer({get: getValue})).toBe("two");
    });
    it("operator in", () => {
        expect(parse("20 in 20").runer({get: getValue})).toBe(true);
    });
    it("operator in with array", () => {
        expect(parse("20 in (10, 20)").runer({get: getValue})).toBe(true);
    });
    it("without data", () => {
        expect(parse("").runer({get: getValue})).toBe("4b067f4b55154c46b0a8d6b34d4d9bfb");
    });
    it("without right value", () => {
        expect(parse("!true ==").runer({get: getValue})).toBe("4b067f4b55154c46b0a8d6b34d4d9bfb");
    });
    it("null value", () => {
        expect(parse("null").runer({get: getValue})).toBe(null);
    });
    it("with tokens", () => {
        expect(parse("one === 1", true).runer({get: getValue})).toBe(false);
    });
    it("value from object", () => {
        expect(parse("{'temp': 5}['temp']").runer({get: getValue})).toBe(5);
    });
    it("array", () => {
        expect(parse("[1,2]").runer({get: getValue})).toEqual([1, 2]);
    });
    it("undefined", () => {
        expect(parse("{'temp': undefined}['temp']").runer({get: getValue})).toBe("undefined");
    });
    it("empty runner", () => {
        expect(parse("variable").runer({})).toEqual(undefined);
    });
    it("empty variable in object", () => {
        expect(parse("{'temp': variable}['temp']").runer({get: getValue})).toBe("variable");
    });
    it("function call", () => {
        expect(parse("a(10)").runer({get: getValue})).toBe(undefined);
    });
    it("conditional positive", () => {
        expect(parse("1 === 1  ? 'yes' : 'no'").runer({get: getValue})).toBe("yes");
    });
    it("conditional negative", () => {
        expect(parse("1 === w  ? 'yes' : 'no'").runer({get: getValue})).toBe("no");
    });
});
