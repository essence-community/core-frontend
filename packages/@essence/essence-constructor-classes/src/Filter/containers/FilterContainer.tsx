import * as React from "react";
import {
    useTranslation,
    toTranslateText,
    toColumnStyleWidth,
    getFromStore,
} from "@essence-community/constructor-share/utils";
import {useModel} from "@essence-community/constructor-share/hooks";
import {IClassProps} from "@essence-community/constructor-share/types";
import {Collapse, useTheme, Grid, Typography} from "@material-ui/core";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react-lite";
import {FilterModel} from "../store/FilterModel";
import {FilterButtons} from "../components/FilterButtons";
import {useStyles} from "./FilterContainer.styles";

export const FilterContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const [store, isAutoLoad] = useModel((options) => new FilterModel(options), props);
    const initialValues = React.useMemo(() => {
        if (store.valuesStorageKey && !pageStore.isActiveRedirect) {
            return getFromStore(store.valuesStorageKey, {});
        }

        return undefined;
    }, [pageStore.isActiveRedirect, store.valuesStorageKey]);
    const [trans] = useTranslation("meta");
    const theme = useTheme();
    const styleTheme = theme.palette.type;
    const title = toTranslateText(trans, bc[VAR_RECORD_DISPLAYED]);
    const classes = useStyles();

    React.useEffect(() => {
        if (isAutoLoad) {
            store.handleAutoload();
        }
    }, [isAutoLoad, store]);

    return useObserver(() => (
        <Collapse in={store.isOpen} collapsedHeight={title || styleTheme === "light" ? "42px" : "1px"}>
            <UIForm
                onSubmit={store.handleSubmit}
                placement="filter"
                submitOnChange={bc.dynamicfilter === "true"}
                bc={bc}
                initialValues={initialValues}
                pageStore={pageStore}
            >
                <Grid
                    spacing={0}
                    container
                    direction={styleTheme === "dark" ? "row" : "column"}
                    wrap="nowrap"
                    data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                >
                    {bc.dynamicfilter === "true" || bc.hideactions === "true" ? null : (
                        <FilterButtons styleTheme={styleTheme} title={title} isOpen={store.isOpen} {...props} />
                    )}
                    {bc.dynamicfilter === "true" && styleTheme !== "light" ? (
                        <Grid item className={`${classes.filterButtons} ${classes.filterButtonsAbsolute}`}>
                            &nbsp;
                        </Grid>
                    ) : null}
                    <Grid item className={classes.maxWidth}>
                        {!title || (styleTheme === "light" && bc.dynamicfilter !== "true") ? null : (
                            <div className={classes.dynamicTitle}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.titleTypography}
                                    data-qtip={title}
                                >
                                    {title}
                                </Typography>
                            </div>
                        )}
                        <div className={classes.filterFields}>
                            <Grid container spacing={1} alignItems="center">
                                {mapComponents(bc.childs, (ChildComp, child) => (
                                    <Grid
                                        item
                                        key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                                        xs={12}
                                        style={toColumnStyleWidth(child.width)}
                                    >
                                        <ChildComp
                                            {...props}
                                            bc={child}
                                            disabled={store.isOpen ? false : props.disabled}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </UIForm>
        </Collapse>
    ));
};
