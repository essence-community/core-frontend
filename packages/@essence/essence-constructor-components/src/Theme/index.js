import {isIE} from "@essence-community/constructor-share/utils";
import merge from "lodash/merge";
import {styleTheme} from "../constants";
import themeDarkAll from "./themeDark/themeDark";
import themeLightAll from "./themeLight/themeLight";
import {themeIEOverrides} from "./themeIEOverrides";
import {themeOverridesDefault} from "./themeOverridesDefault";

const Theme = {
    ...(styleTheme === "light" ? themeLightAll : themeDarkAll),
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
};
const overrides = themeOverridesDefault(Theme);

merge(Theme.overrides, overrides);

if (isIE()) {
    merge(Theme, themeIEOverrides);
}

export const themeVars = Theme;

export default Theme;
