import {IClassProps} from "@essence-community/constructor-share";
import {saveToStore} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_SETTING_THEME,
    VAR_RECORD_ID,
} from "@essence-community/constructor-share/constants/variables";
import * as React from "react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {reaction} from "mobx";
import {ApplicationContext, FormContext} from "@essence-community/constructor-share/context";
import {useTheme} from "@material-ui/core";

const getComponentBc = (bc: IBuilderConfig, defaultTheme?: string): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:0b5e4673fa194e16a0c411ff471d21d2",
    [VAR_RECORD_OBJECT_ID]: bc[VAR_RECORD_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
    [VAR_RECORD_QUERY_ID]: bc[VAR_RECORD_QUERY_ID],
    column: bc.column || "theme",
    datatype: "combo",
    defaultvalue: defaultTheme,
    displayfield: bc.displayfield || "name",
    getglobal: VAR_SETTING_THEME,
    localization: "static",
    noglobalmask: true,
    querymode: "remote",
    records: [
        {[VAR_RECORD_ID]: "dark", name: "static:66ef0068472a4a0394710177f828a9b1", value: "dark"},
        {[VAR_RECORD_ID]: "light", name: "static:fd7c7f3539954cc8a55876e3514906b5", value: "light"},
    ],
    type: "IFIELD",
    valuefield: bc.valuefield || "value",
});

export const ThemeCombo: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;
    const currentTheme = useTheme().palette.type;
    const form = React.useContext(FormContext);
    const applicationStore = React.useContext(ApplicationContext);

    const bc = React.useMemo(() => getComponentBc(props.bc, currentTheme), [props.bc, currentTheme]);

    React.useEffect(
        () =>
            reaction(
                () => bc.column && form.select(bc.column)?.value,
                (theme) => {
                    if (typeof theme === "string" && applicationStore) {
                        saveToStore("theme", theme);
                        // instead of reload
                        // applicationStore.updateGlobalValuesAction({[VAR_SETTING_THEME]: theme});
                        document.location.reload();
                    }
                },
            ),
        [applicationStore, bc.column, form],
    );

    React.useEffect(() => {
        pageStore.updateGlobalValues({[VAR_SETTING_THEME]: currentTheme});
    }, [currentTheme, pageStore]);

    return (
        <>
            {mapComponentOne(bc, (Comp) => (
                <Comp {...props} bc={bc} />
            ))}
        </>
    );
};
