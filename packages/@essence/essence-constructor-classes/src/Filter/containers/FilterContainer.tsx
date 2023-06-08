import * as React from "react";
import cn from "clsx";
import {
    useTranslation,
    toTranslateText,
    getFromStore,
    isEmpty,
    toColumnStyleWidthBc,
} from "@essence-community/constructor-share/utils";
import {useModel} from "@essence-community/constructor-share/hooks";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {Collapse, useTheme, Grid, Typography} from "@material-ui/core";
import {
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PAGE_OBJECT_ID,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react";
import {reaction} from "mobx";
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
    const theme = useTheme<IEssenceTheme>();
    const layoutTheme = theme.essence.layoutTheme;
    const title = toTranslateText(trans, bc[VAR_RECORD_DISPLAYED]);
    const classes = useStyles();

    React.useEffect(() => {
        return reaction(
            () => !isEmpty(pageStore.forms.get(bc[VAR_RECORD_PAGE_OBJECT_ID])),
            (isExist) => {
                if (isExist) {
                    store.handleAutoload(isAutoLoad);
                }
            },
            {
                fireImmediately: true,
            },
        );
    }, [bc, isAutoLoad, pageStore, store]);

    const [childs, sizeChild] = React.useMemo(
        () => [
            (bc.childs || []).map((childBc, index) => ({
                ...childBc,
                [VAR_RECORD_PAGE_OBJECT_ID]: childBc[VAR_RECORD_PAGE_OBJECT_ID] || `${index}`,
                height: childBc.height ? "100%" : undefined,
                maxheight: childBc.maxheight ? "100%" : undefined,
                maxwidth: childBc.maxwidth ? "100%" : undefined,
                minheight: childBc.minheight ? "100%" : undefined,
                minwidth: childBc.minwidth ? "100%" : undefined,
                width: childBc.width ? "100%" : undefined,
            })),
            (bc.childs || []).reduce((res, childBc, index) => {
                res[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] = {
                    height: childBc.height,
                    maxHeight: childBc.maxheight ?? "100%",
                    minHeight: childBc.minheight,
                    ...toColumnStyleWidthBc(childBc),
                };

                return res;
            }, {}),
        ],
        [bc],
    );

    return useObserver(() => (
        <Collapse in={store.isOpen} collapsedHeight={title || layoutTheme === 1 ? "42px" : "1px"}>
            <UIForm
                onSubmit={store.handleSubmit}
                placement="filter"
                submitOnChange={bc.dynamicfilter}
                bc={bc}
                initialValues={initialValues}
                pageStore={pageStore}
                mode="1"
            >
                <Grid
                    spacing={0}
                    container
                    direction={layoutTheme === 2 ? "row" : "column"}
                    wrap="nowrap"
                    data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                >
                    {bc.dynamicfilter || bc.hideactions ? null : (
                        <FilterButtons layoutTheme={layoutTheme} title={title} store={store} {...props} />
                    )}
                    <Grid
                        item
                        className={cn(classes.maxWidth, {
                            [classes.baseFilter]: !bc.dynamicfilter,
                        })}
                    >
                        {!title || (layoutTheme === 1 && !bc.dynamicfilter) ? null : (
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
                            <Grid
                                container
                                spacing={1}
                                {...((bc.contentview && GRID_CONFIGS[bc.contentview]) || GRID_CONFIGS["hbox-wrap"])}
                                {...((bc.contentview &&
                                    bc.align &&
                                    GRID_ALIGN_CONFIGS[`${bc.align}-${bc.contentview}`]) ||
                                    GRID_ALIGN_CONFIGS["left-hbox"])}
                            >
                                {mapComponents(childs, (ChildComp, child) => (
                                    <Grid
                                        item
                                        key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                                        xs={12}
                                        style={sizeChild[child[VAR_RECORD_PAGE_OBJECT_ID]]}
                                    >
                                        <ChildComp
                                            {...props}
                                            bc={child}
                                            disabled={store.isOpen ? props.disabled : true}
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
