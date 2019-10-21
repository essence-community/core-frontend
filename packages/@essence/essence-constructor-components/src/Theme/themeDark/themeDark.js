// @flow

import {themeDarkOverrides} from "./themeDarkOverrides";

export const themeDark = {
    palette: {
        background: {
            default: "rgba(240,248,255,0.78)",
        },
        button: {
            background: {
                primary:
                    "linear-gradient(55deg, rgb(0, 37, 82) 0%, rgb(0, 37, 82) 57%," +
                    " rgb(31, 69, 133) 66%, rgb(48, 80, 167) 74%, rgb(104, 128, 193) 100%)",
                secondary:
                    "linear-gradient(55deg, rgba(245, 143, 31, 1) 0%, rgba(245, 143, 31, 1) 57%," +
                    " rgba(247, 165, 74, 1) 66%, rgba(247, 167, 79, 1) 74%, rgba(247, 167, 79, 1) 100%)",
            },
        },
        common: {
            black: "#000",
            disabled: "#7f828d",
            link: "#0000EE",
            selectedMenu: "#f98d00",
            selectedRecord: "#c8cfde",
            selectedRecordBorder: "#60dfff",
            stripeRecord: "#f3f3f5",
            success: "#0f9d58",
            warning: "#fff82a",
            white: "#fff",
        },
        error: {
            main: "#fc5d40",
        },
        grey: {
            arrow: "#CBCDE0",
            authDisableBtn: "#4c5260",
            backgroundInput: "#fafafa",
            checkbox: "#e5e8f4",
            disable: "#bbb",
            info: "#dbdfef",
            light: "#dfdfdf",
            main: "#cbcaca",
            shadow: "rgb(203, 202, 202, 0.4)",
        },
        icon: {
            secondary: "#80838d",
        },
        primary: {
            field: "#51a1b5",
            icon: "#91c9c4",
            info: "#dbdfef",
            light: "#51a1b5",
            main: "#2c3345",
        },
        secondary: {
            field: "#a1a1a1",
            main: "#dfdfdf",
        },
        text: {
            dark: "#2c3345",
            disabled: "#2c3345",
            light: "#dbdfef",
        },
        transparent: {
            main: "transparent",
        },
    },
    sizing: {
        appbarHeight: 45,
        controlPanelWidth: 58,
        gridRowHeight: 30,
    },
    typography: {
        fontFamily: "'Roboto Light', 'Roboto Regular', 'Roboto'",
        useNextVariants: true,
    },
    zIndex: {
        combo: 1900,
        drawer: 1700,
        grid: 2,
        linkPopover: 3,
        scroller: 2,
        tooltip: 2000,
    },
    /* eslint-disable sort-keys */
    essence: {
        ui: {
            modal: {
                palette: {
                    background: "#2c3345",
                },
            },
            notification: {
                palette: {
                    gray: "#939393",
                },
            },
        },
        palette: {
            common: {
                black: "#000",
                disabled: "#7f828d",
                link: "#0000EE",
                selectedMenu: "#f98d00",
                selectedRecord: "#c8cfde",
                selectedRecordBorder: "#60dfff",
                stripeRecord: "#f3f3f5",
                success: "#0f9d58",
                warning: "#fff82a",
                white: "#fff",
            },
            icon: {
                secondary: "#80838d",
            },
            grey: {
                arrow: "#CBCDE0",
                authDisableBtn: "#4c5260",
                backgroundInput: "#fafafa",
                checkbox: "#e5e8f4",
                disable: "#bbb",
                info: "#dbdfef",
                light: "#dfdfdf",
                main: "#cbcaca",
                shadow: "rgb(203, 202, 202, 0.4)",
            },
            text: {
                dark: "#2c3345",
                disabled: "#2c3345",
                light: "#dbdfef",
            },
        },
        zIndex: {
            backdrop: 3,
            loader: 1600,
        },
        sizing: {
            appBarHeight: 45,
            gridRowHeight: 30,
        },
    },
    /* eslint-enable sort-keys */
};

export default {
    overrides: themeDarkOverrides(themeDark),
    ...themeDark,
};
