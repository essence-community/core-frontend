import {IClassProps} from "@essence-community/constructor-share/types";
import {StyleRules} from "@mui/styles";

export const darkStyles = (): StyleRules<IClassProps, "root"> => ({
    root: {
        borderRadius: "3px 0 3px 3px",
        overflow: "hidden",
    },
});
