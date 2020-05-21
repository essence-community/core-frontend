import {IEssenceTheme} from "@essence-community/constructor-share";
import {Theme} from "@material-ui/core";

// eslint-disable-next-line quotes
const fontFamily = '"Uni Neue Regular", "Roboto Light", "Roboto Regular", "Roboto"';

export const getThemeLight = (theme: Theme): IEssenceTheme => ({
    ...theme,
    palette: {
        ...theme.palette,
        background: {
            default: "#fff",
            paper: "#fff",
        },
        common: {
            black: "#000",
            white: "#fff",
        },
        primary: {
            ...theme.palette.primary,
            main: "#5879a9",
        },
        secondary: {
            ...theme.palette.secondary,
            main: "#f78f1e",
        },
        text: {
            ...theme.palette.text,
            disabled: "#2c3345",
        },
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
                light: "#EEEFF2",
                main: "#cbcaca",
                modal: "",
                shadow: "rgb(203, 202, 202, 0.4)",
            },
            icon: {
                primary: "#5879a9",
                secondary: "#cbcaca",
            },
            primary: {
                field: "#a1a1a1",
                icon: "#5879a9",
            },
            tab: {
                active: "#fff0e1",
                hover: "#e9ecf4",
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
                    background: "#d8dde8",
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
