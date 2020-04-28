// @flow
import * as React from "react";
import {Grid} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {buttonDirection} from "../../constants";
import {getModeTitle} from "../../utils/string";
import {type HistoryModelType} from "../../stores/HistoryModel";
import {type PanelFormModel} from "../../stores/PanelFormModel";
import {type PageModelType} from "../../stores/PageModel";
import {useStyles} from "./BuilderPanelEditingButtons.styles";

type PropsType = {
    store: HistoryModelType | PanelFormModel,
    bc: Object,
    pageStore: PageModelType,
};

const BuilderPanelEditingButtons = (props: PropsType) => {
    const {store, bc, pageStore} = props;
    const {overrides} = store.btnsConfig;
    const classes = useStyles();
    const theme = useTheme();
    const isDarkTheme = theme.palette.type === "dark";

    const saveBtnBc = React.useMemo(
        () => ({
            onlyicon: isDarkTheme ? "true" : "false",
            ...overrides["Override Save Button"],
        }),
        [isDarkTheme, overrides],
    );

    const cancelBtnBc = React.useMemo(
        () => ({
            onlyicon: isDarkTheme ? "true" : "false",
            ...overrides["Override Cancel Button"],
        }),
        [isDarkTheme, overrides],
    );

    return (
        <Grid container spacing={1} alignItems="center" direction={buttonDirection}>
            {mapComponents([saveBtnBc, cancelBtnBc], (ChildCmp, childBc) => (
                <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                    <ChildCmp bc={childBc} pageStore={pageStore} visible />
                </Grid>
            ))}

            <Grid
                item
                className={classes.editModeLabel}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-mode-title`}
            >
                {getModeTitle(store.mode)}
            </Grid>
        </Grid>
    );
};

export default BuilderPanelEditingButtons;
