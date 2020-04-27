// @flow
import * as React from "react";
import {useObserver} from "mobx-react";
import {Grid} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {getModeTitle} from "../../utils/string";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type WindowModelType} from "../../stores/WindowModel";
import {useStyles} from "./InlineButtons.styles";

type PropsType = {
    store: WindowModelType,
    gridStore: GridModelType,
    pageStore: PageModelType,
};

// eslint-disable-next-line max-lines-per-function, func-names
const InlineButtons = React.memo(function InlineButtonsMemo(props: PropsType) {
    const {store, gridStore, pageStore} = props;
    const {overrides} = gridStore.gridBtnsConfig;
    const theme = useTheme();
    const classes = useStyles();
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

    return useObserver(() => (
        <Grid container spacing={1} alignItems="center" direction={isDarkTheme ? "column" : "row"}>
            <Grid item>
                {mapComponents([saveBtnBc], (ChildCmp, childBc) => (
                    <ChildCmp key="save" bc={childBc} pageStore={pageStore} visible />
                ))}
            </Grid>
            <Grid item>
                {mapComponents([cancelBtnBc], (ChildCmp, childBc) => (
                    <ChildCmp key="cancel" bc={childBc} pageStore={pageStore} visible />
                ))}
            </Grid>
            <Grid
                item
                className={classes.label}
                data-page-object={`${store.windowBc[VAR_RECORD_PAGE_OBJECT_ID]}-mode-title`}
            >
                {getModeTitle(store.config.mode)}
            </Grid>
        </Grid>
    ));
});

export default InlineButtons;
