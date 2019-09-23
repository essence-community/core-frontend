// @flow
import {themeLightOverrides} from "./themeLightOverrides";

export const themeLight = {
    palette: {
        background: {
            default: "#fff",
        },
        button: {
            background: {
                primary:
                    "linear-gradient(55deg, rgb(0, 37, 82) 0%, rgb(0, 37, 82) 57%, rgb(31, 69, 133) 66%," +
                    " rgb(48, 80, 167) 74%, rgb(104, 128, 193) 100%)",
                secondary:
                    "linear-gradient(55deg, rgba(245, 143, 31, 1) 0%, rgba(245, 143, 31, 1) 57%," +
                    " rgba(247, 165, 74, 1) 66%, rgba(247, 167, 79, 1) 74%, rgba(247, 167, 79, 1) 100%)",
            },
        },
        common: {
            black: "#000",
            link: "#0000EE",
            selectedMenu: "#f98d00",
            selectedRecord: "#c8cfde",
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
            backgroundInput: "#fafafa",
            checkbox: "#e5e8f4",
            disable: "#bbb",
            info: "#dbdfef",
            light: "#EEEFF2",
            main: "#cbcaca",
            modal: "#d8dde8",
            shadow: "rgb(203, 202, 202, 0.4)",
        },
        icon: {
            secondary: "#cbcaca",
        },
        primary: {
            field: "#a1a1a1",
            icon: "#5879a9",
            main: "#5879a9",
        },
        secondary: {
            field: "#a1a1a1",
            main: "#f78f1e",
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
        gridRowHeight: 30,
    },
    typography: {
        fontFamily: "'Roboto Light', 'Roboto Regular', 'Roboto'",
        useNextVariants: true,
    },
    zIndex: {
        backdrop: 3,
        combo: 1900,
        drawer: 1700,
        grid: 2,
        linkPopover: 3,
        loader: 1600,
        scroller: 2,
        tooltip: 2000,
    },
};

export default {
    overrides: themeLightOverrides(themeLight),
    ...themeLight,
};
