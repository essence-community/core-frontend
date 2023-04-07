import * as React from "react";
import cn from "clsx";
import {useObserver} from "mobx-react";
import {mapComponents} from "@essence-community/constructor-share/components";
import {toColumnStyleWidth, i18next} from "@essence-community/constructor-share/utils";
import {IBuilderConfig, IClassProps, IEssenceTheme, IPageModel} from "@essence-community/constructor-share/types";
import {Scrollbars, PageLoader} from "@essence-community/constructor-share/uicomponents";
import {ApplicationContext, FormContext, ResizeContext} from "@essence-community/constructor-share/context";
import {Grid, useTheme} from "@material-ui/core";
import {settingsStore, PageModel, snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_PARENT_ID,
    loggerRoot,
    VAR_RECORD_NOLOAD,
} from "@essence-community/constructor-share/constants";
import {reaction} from "mobx";
import {IForm, Form} from "@essence-community/constructor-share/Form";

import {useResizerEE} from "@essence-community/constructor-share/hooks";
import {PagerWindows} from "../components/PagerWindows";
import {focusPageElement} from "../utils/focusPageElement";
import {PagerWindowMessage} from "../components/PagerWindowMessage";
import {renderGlobalValuelsInfo} from "../../Application/utils/renderGlobalValuelsInfo";
import {PagerErrorBoundary} from "../components/PagerErrorBoundary";
import {useStyles} from "./PagerContainer.styles";

const DARK_PAPER_ELEVATION = 8;
const VERTICAL_STYLE = {zIndex: 3};
const SCROLLABRS_STYLE = {height: "100%", paddingRight: 10, width: "100%"};
const logger = loggerRoot.extend("PagerContainer");
const onFormChange = (form: IForm) => {
    logger(i18next.t("static:f9c3bf3691864f4d87a46a9ba367a855"), form.values);
};

interface IPagerProps extends IClassProps {}

// eslint-disable-next-line max-lines-per-function
export const PagerContainer: React.FC<IPagerProps> = (props) => {
    const {bc} = props;
    const {[VAR_RECORD_PARENT_ID]: parentId, defaultvalue} = bc;
    const applicationStore = React.useContext(ApplicationContext);
    const emitter = useResizerEE(true);
    /**
     * We are making a new pageStore when we get defaultvalue.
     * It means that we want to make custom page and getting them from server by bc.ck_query
     */
    const pageStore = React.useMemo<IPageModel>(() => {
        if (applicationStore && defaultvalue && parentId !== applicationStore.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
            const newPageStore: IPageModel = new PageModel({
                applicationStore,
                defaultVisible: true,
                isActiveRedirect: false,
                isReadOnly: false,
                pageId: defaultvalue,
            });

            newPageStore.loadConfigAction(defaultvalue);

            return newPageStore;
        }

        return props.pageStore;
    }, [applicationStore, defaultvalue, parentId, props.pageStore]);

    const classes = useStyles(props);
    const theme = useTheme<IEssenceTheme>();
    const form: IForm = React.useMemo(
        () =>
            new Form({
                editing: true,
                hooks: {onChange: onFormChange},
                mode: "1",
                placement: "pager",
                values: {},
            }),
        [],
    );

    React.useEffect(() => {
        return () => {
            pageStore.setPageElAction(null);
            pageStore.setPageInnerElAction(null);
        };
    }, [pageStore]);

    React.useEffect(() => {
        return reaction(
            () => pageStore.globalValues.toJS(),
            (globalValues) => {
                snackbarStore.snackbarOpenAction({
                    autoHidden: true,
                    hiddenTimeout: 0,
                    status: "debug",
                    text: renderGlobalValuelsInfo(globalValues),
                    title: `${i18next.t("static:dcfb61366b054c6e95ae83593cfb9cd9")}: ${i18next.t(
                        pageStore.pageId || "",
                    )}`,
                });
            },
            {fireImmediately: true},
        );
    }, [pageStore]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        focusPageElement(event, pageStore);
    };

    return useObserver(() => {
        const content = (
            <div ref={pageStore.setPageInnerElAction} className={classes.rootPageDivContent}>
                {pageStore.isEdit ? <div className={classes.backdrop} /> : null}
                <PageLoader
                    pageStore={pageStore}
                    container={pageStore.pageEl}
                    loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"}
                />
                <FormContext.Provider value={form}>
                    <Grid container spacing={2} className={classes.rootPageDivContent}>
                        {mapComponents(
                            pageStore.route?.[VAR_RECORD_NOLOAD] === 1 ? bc.childs : pageStore.pageBc,
                            (ChildComponent: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                <Grid
                                    key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                    item
                                    xs={12}
                                    style={toColumnStyleWidth(childBc.width)}
                                >
                                    <ChildComponent
                                        readOnly={pageStore.isReadOnly}
                                        pageStore={pageStore}
                                        bc={childBc}
                                        visible={pageStore.visible}
                                        elevation={theme.essence.layoutTheme === 1 ? undefined : DARK_PAPER_ELEVATION}
                                    />
                                </Grid>
                            ),
                        )}
                    </Grid>
                </FormContext.Provider>
            </div>
        );

        return (
            <div
                ref={pageStore.setPageElAction}
                className={cn(classes.root, {[classes.hidden]: !pageStore.visible})}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                <React.Suspense fallback={null}>
                    <ResizeContext.Provider value={emitter}>
                        <PagerErrorBoundary pageStore={pageStore}>
                            {/* TODO: to make pager as part of content (page) */}
                            {/* {defaultvalue ? (
                    content
                ) : ( */}
                            <Scrollbars
                                style={SCROLLABRS_STYLE}
                                hideTracksWhenNotNeeded
                                withRequestAnimationFrame
                                contentProps={{
                                    className: classes.rootPageContent,
                                }}
                                pageStore={pageStore}
                                verticalStyle={VERTICAL_STYLE}
                                scrollbarsRef={pageStore.setPageScrollEl}
                            >
                                {content}
                            </Scrollbars>
                            {/* )} */}
                            <PagerWindowMessage pageStore={pageStore} />
                            {bc[VAR_RECORD_PAGE_OBJECT_ID] === pageStore.pagerBc[VAR_RECORD_PAGE_OBJECT_ID] ? (
                                <PagerWindows {...props} />
                            ) : null}
                        </PagerErrorBoundary>
                    </ResizeContext.Provider>
                </React.Suspense>
            </div>
        );
    });
};
