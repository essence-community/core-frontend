import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {Theme} from "@material-ui/core";

// eslint-disable-next-line quotes
const fontFamily = '"Uni Neue Regular", "Roboto Light", "Roboto Regular", "Roboto"';

export const getThemeDark = (theme: Theme): IEssenceTheme => ({
    ...theme,
    palette: {
        ...theme.palette,
        action: {
            ...theme.palette.action,
            active: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
            hover: "rgba(0, 0, 0, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(0, 0, 0, 0.14)",
        },
        background: {
            default: "rgba(240,248,255,0.78)",
            paper: "#fff",
        },
        primary: {
            contrastText: "#fff",
            dark: "rgb(30, 35, 48)",
            light: "#51a1b5",
            main: "#2c3345",
        },
        secondary: {
            contrastText: "rgba(0, 0, 0, 0.87)",
            dark: "rgb(156, 156, 156)",
            light: "rgb(229, 229, 229)",
            main: "#dfdfdf",
        },
        text: {
            disabled: "#2c3345",
            hint: "rgba(0, 0, 0, 0.38)",
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
        },
        type: "dark",
    },
    props: {
        // Name of the component ⚛️
        MuiButtonBase: {
            /*
             * The properties to apply
             * No more ripple, on the whole application 💣!
             */
            disableRipple: true,
        },
    },
    typography: {
        body1: {...theme.typography.body1, fontFamily},
        body2: {...theme.typography.body2, fontFamily},
        button: {...theme.typography.button, fontFamily},
        caption: {...theme.typography.caption, fontFamily},
        fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeightBold: theme.typography.fontWeightBold,
        fontWeightLight: theme.typography.fontWeightLight,
        fontWeightMedium: theme.typography.fontWeightMedium,
        fontWeightRegular: theme.typography.fontWeightRegular,
        h1: {...theme.typography.h1, fontFamily},
        h2: {...theme.typography.h2, fontFamily},
        h3: {...theme.typography.h3, fontFamily},
        h4: {...theme.typography.h4, fontFamily},
        h5: {...theme.typography.h5, fontFamily},
        h6: {...theme.typography.h6, fontFamily},
        overline: {...theme.typography.overline, fontFamily},
        pxToRem: theme.typography.pxToRem,
        subtitle1: {...theme.typography.subtitle1, fontFamily},
        subtitle2: {...theme.typography.subtitle2, fontFamily},
    },
    // eslint-disable-next-line sort-keys
    essence: {
        codeTheme: "dark",
        layoutTheme: 2,
        palette: {
            common: {
                black: "#000",
                disabled: "#7f828d",
                link: "#0000EE",
                main: "#cbcaca",
                selectedMenu: "#f98d00",
                selectedRecord: "#c8cfde",
                selectedRecordBorder: "#60dfff",
                stripeRecord: "#f3f3f5",
                success: "#0f9d58",
                warning: "#fff82a",
                white: "#fff",
            },
            grey: {
                arrow: "#CBCDE0",
                backgroundInput: "#fafafa",
                checkbox: "#e5e8f4",
                disable: "#bbb",
                info: "#dbdfef",
                light: "#dfdfdf",
                main: "#cbcaca",
                modal: "",
                shadow: "rgb(203, 202, 202, 0.4)",
            },
            icon: {
                primary: "#91c9c4",
                secondary: "#80838d",
            },
            primary: {
                field: "#51a1b5",
                icon: "#91c9c4",
            },
            tab: {
                active: "",
                hover: "",
            },
            text: {
                dark: "#2c3345",
                disabled: "#2c3345",
                light: "#dbdfef",
            },
        },
        sizing: {
            appBarHeight: 45,
            controlPanelWidth: 58,
            gridRowHeight: 30,
        },
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
        zIndex: {
            backdrop: 3,
            loader: 1600,
        },
    },
});
