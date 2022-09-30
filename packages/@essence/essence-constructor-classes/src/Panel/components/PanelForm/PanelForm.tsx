/* eslint-disable max-lines-per-function */
import * as React from "react";
import {IClassProps, IEssenceTheme, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_NAME} from "@essence-community/constructor-share/constants/variables";
import {toTranslateText} from "@essence-community/constructor-share/utils/transform";
import cn from "clsx";
import {mapComponents} from "@essence-community/constructor-share/components";
import {Grid, useTheme, ThemeProvider} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import {useObserver} from "mobx-react";
import {EmptyTitle} from "@essence-community/constructor-share/uicomponents/EmptyTitle";
import {PanelEditingButtons} from "../PanelEditingButtons/PanelEditingButtons";
import {Panel} from "../Panel/Panel";
import {useStyles} from "./PanelForm.styles";
import {makeTheme} from "./PanelForm.overrides";

interface IPanelFormProps extends IClassProps {
    hideTitle?: boolean;
}

const FITER_ONE_BUTTON = 42;
const FILTER_THREE_BUTTON = 128;

export const PanelForm: React.FC<IPanelFormProps> = (props) => {
    const {bc, readOnly, pageStore, visible, elevation, disabled, hidden, hideTitle, children} = props;
    const {filters = [], hideactions, topbtn = []} = bc;
    const theme = useTheme<IEssenceTheme>();
    const themeFilterNew = React.useMemo(() => makeTheme(theme), [theme]);
    const isDarkTheme = React.useMemo(() => theme.essence.layoutTheme === 2, [theme]);
    const form = React.useContext(FormContext);
    const isHideActions = React.useMemo(
        () => hideactions || (topbtn.length === 0 && (!isDarkTheme || (isDarkTheme && filters.length === 0))),
        [filters.length, hideactions, isDarkTheme, topbtn.length],
    );
    const filterIsOpen: boolean = useObserver(() => {
        const filterStore: any = filters[0] && pageStore.stores.get(filters[0][VAR_RECORD_PAGE_OBJECT_ID]);

        return filterStore && filterStore.isOpen;
    });

    const [trans] = useTranslation("meta");
    const transCvDisplayed = toTranslateText(trans, bc[VAR_RECORD_DISPLAYED]);
    const classes = useStyles();

    const actions = React.useMemo(
        () =>
            topbtn
                .reverse()
                .filter((bc) => !bc[VAR_RECORD_NAME] || bc[VAR_RECORD_NAME]?.indexOf("Override") !== 0)
                .map((childBc) => {
                    const isAddButton = childBc.mode === "1";
                    const contentview =
                        childBc.contentview?.startsWith("hbox") && isDarkTheme
                            ? childBc.contentview.replace("hbox", "vbox")
                            : childBc.contentview;

                    return isAddButton
                        ? {...childBc, contentview, uitype: "4"}
                        : {...childBc, contentview, uitype: childBc.uitype === "1" ? "11" : childBc.uitype};
                }) as IBuilderConfig[],
        [topbtn, isDarkTheme],
    );

    const paddingTop = React.useMemo(() => {
        const isFilterActionsPresent = filters.length > 0 && !filters[0].dynamicfilter;

        if (isFilterActionsPresent && isDarkTheme) {
            if (filters && filters[0].topbtn && filters[0].topbtn.length > 0) {
                return filters[0].topbtn.length * FITER_ONE_BUTTON;
            }

            return filterIsOpen ? FILTER_THREE_BUTTON : FITER_ONE_BUTTON;
        }

        return undefined;
    }, [filterIsOpen, filters, isDarkTheme]);

    return useObserver(() => {
        const isEditing = form.placement !== "application" && form.placement !== "pager" ? form.editing : false;
        const classNameRoot = cn(classes.root, isHideActions ? classes.rootActionsHide : classes.rootActions, {
            [classes.panelEditing]: isEditing,
        });

        const filterComponent = (
            <ThemeProvider theme={themeFilterNew}>
                <Grid item xs>
                    {mapComponents(filters, (ChildCmp, childBc) => (
                        <ChildCmp
                            key={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                            // {...props}
                            pageStore={pageStore}
                            hidden={hidden}
                            disabled={isEditing || disabled}
                            readOnly={readOnly}
                            visible={visible}
                            elevation={elevation}
                            bc={childBc}
                        />
                    ))}
                </Grid>
            </ThemeProvider>
        );

        const actionsComponent = (
            <Grid item style={{paddingTop}} className={classes.formActions}>
                {isEditing ? (
                    <PanelEditingButtons bc={bc} pageStore={pageStore} visible={visible} />
                ) : (
                    <Grid
                        container
                        className={classes.actionsBar}
                        alignItems="center"
                        direction={isDarkTheme ? "column-reverse" : "row"}
                        spacing={1}
                    >
                        {mapComponents(actions, (ChildComp, childBc) => (
                            <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                <ChildComp
                                    bc={childBc}
                                    disabled={disabled}
                                    pageStore={pageStore}
                                    readOnly={readOnly}
                                    visible={visible}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        );

        const formComponent = (
            <Grid item className={cn(classes.formRoot, {[classes.formRootEditing]: isEditing})} xs zeroMinWidth>
                <div className={classes.content}>
                    {children ? (
                        children
                    ) : (
                        <Panel
                            bc={bc}
                            disabled={disabled}
                            hidden={hidden}
                            visible={visible}
                            readOnly={readOnly}
                            pageStore={pageStore}
                            isFormPanel
                        />
                    )}
                </div>
            </Grid>
        );

        const themeContent = isDarkTheme ? (
            <Grid container direction="row" className={classNameRoot} wrap="nowrap">
                {isHideActions ? null : actionsComponent}
                <Grid item container direction="column" className={classes.contentRoot}>
                    <Grid item xs>
                        {hideTitle ? null : <EmptyTitle hideactions title={transCvDisplayed} filters={filters} />}
                    </Grid>
                    {filterComponent}
                    {formComponent}
                </Grid>
            </Grid>
        ) : (
            <Grid container direction="column" className={classNameRoot} wrap="nowrap">
                {hideTitle ? null : (
                    <Grid item xs>
                        <EmptyTitle hideactions title={transCvDisplayed} filters={filters} />
                    </Grid>
                )}
                {filterComponent}
                {isHideActions ? null : actionsComponent}
                {formComponent}
            </Grid>
        );

        return themeContent;
    });
};
