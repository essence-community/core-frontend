import {createClassMap, resolveStyles, sheetToCss} from "../jssToCss";

describe("jssToCss", () => {
    it("rewrites $class refs and &$same-element", () => {
        const sheet = resolveStyles(
            () => ({
                active: {},
                child: {color: "red"},
                root: {
                    "& $child": {color: "blue"},
                    "&$active": {opacity: 1},
                    padding: 8,
                },
            }),
            {},
            undefined,
        );
        const classes = createClassMap("T", 1, sheet);
        const css = sheetToCss(sheet, classes);

        expect(classes.root).toBe("T-root-1");
        expect(css).toContain(`.${classes.root} .${classes.child}{color:blue;}`);
        expect(css).toContain(`.${classes.root}.${classes.active}{opacity:1;}`);
        expect(css).toContain(`.${classes.root}{padding:8px;}`);
        expect(css).toContain(`.${classes.child}{color:red;}`);
    });

    it("supports @global and props callbacks", () => {
        const sheet = resolveStyles(
            () => ({
                "@global": {body: {margin: 0}},
                root: {
                    "@global": {".portal": {zIndex: 2}},
                    top: (props: {top: number}) => `${props.top}px`,
                },
            }),
            {},
            {top: 10},
        );
        const classes = createClassMap("G", 2, sheet);
        const css = sheetToCss(sheet, classes);

        expect(css).toContain("body{margin:0;}");
        expect(css).toContain(`.${classes.root} .portal{z-index:2;}`);
        expect(css).toContain(`.${classes.root}{top:10px;}`);
    });
});
