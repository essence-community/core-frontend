import {Theme} from "@material-ui/core";

export interface IEssenceTheme extends Theme {
    essence: {
        ui: {
            modal: {
                palette: {
                    background: string;
                };
            };
        };
        palette: {
            grey: {
                main: string;
                modal: string;
                light: string;
                arrow: string;
            };
            primary: {
                main: string;
                light: string;
            };
            secondary: {
                main: string;
            };
            text: {
                light: string;
            };
            common: {
                white: string;
            };
        };
        zIndex: {
            backdrop: number;
            loader: number;
        };
        sizing: {
            appbarHeight: number;
        };
    };
}
