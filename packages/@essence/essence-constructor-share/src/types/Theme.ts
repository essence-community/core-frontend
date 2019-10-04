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
                modal: string;
            };
        };
        zIndex: {
            backdrop: number;
            loader: number;
        };
    };
}
