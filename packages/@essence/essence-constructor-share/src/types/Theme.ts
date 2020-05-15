import {Theme} from "@material-ui/core";

export interface IEssenceTheme extends Theme {
    essence: {
        ui: {
            modal: {
                palette: {
                    background: string;
                };
            };
            notification: {
                palette: {
                    gray: string;
                };
            };
        };
        palette: {
            common: {
                black: string;
                disabled: string;
                link: string;
                selectedMenu: string;
                selectedRecord: string;
                selectedRecordBorder: string;
                stripeRecord: string;
                success: string;
                warning: string;
                white: string;
            };
            icon: {
                secondary: string;
            };
            grey: {
                arrow: string;
                backgroundInput: string;
                checkbox: string;
                disable: string;
                info: string;
                light: string;
                main: string;
                shadow: string;
            };
            tab: {
                active: string;
                hover: string;
            };
            text: {
                dark: string;
                disabled: string;
                light: string;
            };
            primary: {
                field: string;
            };
        };
        zIndex: {
            backdrop: number;
            loader: number;
        };
        sizing: {
            appBarHeight: number;
            controlPanelWidth: number;
            gridRowHeight: number;
        };
    };
}
