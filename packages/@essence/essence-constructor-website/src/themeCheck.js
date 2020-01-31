import {getFromStore, saveToStore} from "@essence-community/constructor-share/utils";
import {VAR_SETTING_THEME, VAR_RECORD_ID, VAR_RECORD_CV_VALUE} from "@essence-community/constructor-share/constants";

/*
 * Need to verify theme and set from settings
 * Should be set into css theme, but for lefacy code we need this imlementation
 */

const settingTheme = window.SETTINGS?.find((setting) => setting[VAR_RECORD_ID] === VAR_SETTING_THEME)?.[
    VAR_RECORD_CV_VALUE
];
const theme = getFromStore("theme");

if (!theme && settingTheme) {
    saveToStore("theme", settingTheme);
    document.location.reload();
}
