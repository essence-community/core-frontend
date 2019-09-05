import merge from "lodash/merge";
import {styleTheme} from "../../../../constants";
import {GridColumnLinkStyleLight} from "./GridColumnLinkStyleLight";
import {GridColumnLinkStyleDark} from "./GridColumnLinkStyleDark";

const styles = styleTheme === "light" ? GridColumnLinkStyleLight : GridColumnLinkStyleDark;

const defaultStyles = (theme) => ({
    iconButtonOpenRoot: {},
    iconButtonRoot: {
        color: theme.palette.primary.main,
        height: 30,
        transition: "background-color 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: 30,
    },
    listRoot: {},
});

export default (theme) => merge(defaultStyles(theme), styles(theme));
