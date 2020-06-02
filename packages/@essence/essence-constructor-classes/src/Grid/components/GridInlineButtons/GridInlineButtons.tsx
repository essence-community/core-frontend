import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {Grid} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IClassProps, IBuilderMode} from "@essence-community/constructor-share/types";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {getGridBtnsConfig, getModeTitle} from "../../utils";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {useStyles} from "./GridInlineButtons.styles";

interface IGridInlineButtonsProps extends IClassProps {
    gridStore: IGridModel;
}

export const GridInlineButtons: React.FC<IGridInlineButtonsProps> = React.memo(function GridInlineButtonsMemo({
    gridStore,
    ...classProps
}) {
    const {bc} = classProps;
    const theme = useTheme();
    const classes = useStyles();
    const [trans] = useTranslation("meta");
    const isDarkTheme = theme.palette.type === "dark";
    const {overrides} = React.useMemo(() => getGridBtnsConfig(gridStore.bc, theme.palette.type), [
        gridStore.bc,
        theme.palette.type,
    ]);

    const saveBtnBc = React.useMemo(
        () => ({
            onlyicon: isDarkTheme ? true : false,
            ...overrides["Override Save Button"],
        }),
        [isDarkTheme, overrides],
    );

    const cancelBtnBc = React.useMemo(
        () => ({
            onlyicon: isDarkTheme ? true : false,
            ...overrides["Override Cancel Button"],
        }),
        [isDarkTheme, overrides],
    );

    return useObserver(() => (
        <Grid container spacing={1} alignItems="center" direction={isDarkTheme ? "column" : "row"}>
            <Grid item>
                {mapComponentOne(saveBtnBc, (ChildCmp, childBc) => (
                    <ChildCmp {...classProps} bc={childBc} />
                ))}
            </Grid>
            <Grid item>
                {mapComponentOne(cancelBtnBc, (ChildCmp, childBc) => (
                    <ChildCmp {...classProps} bc={childBc} />
                ))}
            </Grid>
            <Grid item className={classes.label} data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-mode-title`}>
                {trans(getModeTitle(bc.mode as IBuilderMode))}
            </Grid>
        </Grid>
    ));
});
