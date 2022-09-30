import * as React from "react";
import {Grid} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CN_ORDER,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {mapComponents} from "@essence-community/constructor-share/components";
import {IClassProps, IBuilderMode, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {getModeTitle} from "@essence-community/constructor-share/utils/getModeTitle";
import {useObserver} from "mobx-react";
import {mergeComponents, useTranslation} from "@essence-community/constructor-share/utils";
import {toTranslateText} from "@essence-community/constructor-share/utils/transform";
import {useStyles} from "./PanelEditingButtons.styles";

const getSaveBtnConfig = (bc: IBuilderConfig, isDarkTheme: boolean): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:8a930c6b5dd440429c0f0e867ce98316",
    [VAR_RECORD_NAME]: "Override Save Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-save`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-save`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onSimpleSave",
    iconfont: isDarkTheme ? "save" : undefined,
    onlyicon: isDarkTheme ? true : undefined,
    type: "BTN",
    uitype: "5",
});

const getCancelBtnConfig = (bc: IBuilderConfig, isDarkTheme: boolean): IBuilderConfig => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_NAME]: "Override Cancel Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    handler: "onCloseWindow",
    iconfont: isDarkTheme ? "times" : undefined,
    onlyicon: isDarkTheme ? true : undefined,
    type: "BTN",
    uitype: "6",
});

export const PanelEditingButtons: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles();
    const theme = useTheme<IEssenceTheme>();
    const [trans] = useTranslation("meta");
    const isDarkTheme = theme.essence.layoutTheme === 2;
    const form = React.useContext(FormContext);
    const [saveBtnBc, cancelBtnBc] = React.useMemo(() => {
        const {overrides} = mergeComponents(
            bc.topbtn,
            {
                "Override Cancel Button": getCancelBtnConfig(bc, isDarkTheme),
                "Override Save Button": getSaveBtnConfig(bc, isDarkTheme),
            },
            {
                include: ["setglobal"],
            },
        );

        return [overrides["Override Save Button"], overrides["Override Cancel Button"]];
    }, [bc, isDarkTheme]);

    return useObserver(() => (
        <Grid container spacing={1} alignItems="center" direction={isDarkTheme ? "column" : "row"}>
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
                {toTranslateText(trans, getModeTitle(form.mode as IBuilderMode))}
            </Grid>
        </Grid>
    ));
};
