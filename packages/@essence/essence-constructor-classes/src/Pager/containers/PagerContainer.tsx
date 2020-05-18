import * as React from "react";
import cn from "classnames";
import {useObserver, useDisposable} from "mobx-react-lite";
import {mapComponents} from "@essence-community/constructor-share/components";
import {toColumnStyleWidth, i18next} from "@essence-community/constructor-share/utils";
import {IBuilderConfig, IClassProps, IPageModel} from "@essence-community/constructor-share/types";
import {Scrollbars, PageLoader} from "@essence-community/constructor-share/uicomponents";
import {ApplicationContext, FormContext} from "@essence-community/constructor-share/context";
import {Grid, useTheme} from "@material-ui/core";
import {settingsStore, PageModel, snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_VISIBLE_MENU,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_PARENT_ID,
    loggerRoot,
} from "@essence-community/constructor-share/constants";
import {reaction} from "mobx";
import {IForm, Form} from "@essence-community/constructor-share/Form";
import {PagerWindows} from "../components/PagerWindows";
import {focusPageElement} from "../utils/focusPageElement";
import {PagerWindowMessage} from "../components/PagerWindowMessage";
import {renderGlobalValuelsInfo} from "../../Application/utils/renderGlobalValuelsInfo";
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
    const applicationStore = React.useContext(ApplicationContext);
    /**
     * We are making a new pageStore when we get defaultvalue.
     * It means that we want to make custom page and getting them from server by bc.ck_query
     */
    const pageStore = React.useMemo<IPageModel>(() => {
        if (
            applicationStore &&
            bc &&
            bc.defaultvalue &&
            bc[VAR_RECORD_PARENT_ID] !== applicationStore.bc[VAR_RECORD_PAGE_OBJECT_ID]
        ) {
            const newPageStore: IPageModel = new PageModel({
                applicationStore,
                defaultVisible: true,
                isActiveRedirect: false,
                pageId: bc.defaultvalue,
            });

            newPageStore.loadConfigAction(bc.defaultvalue);

            return newPageStore;
        }

        return props.pageStore;
    }, [applicationStore, bc, props.pageStore]);

    const classes = useStyles(props);
    const theme = useTheme();
    const {route} = pageStore;
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

    // TODO: need to ferify it
    React.useEffect(() => {
        if (route && !route[VAR_RECORD_ROUTE_VISIBLE_MENU] && bc && bc.defaultvalue !== pageStore.pageId) {
            setTimeout(() => {
                if (applicationStore) {
                    applicationStore.pagesStore.removePageAction(pageStore.pageId);
                }
            });
        }
    }, [applicationStore, pageStore.pageId, route, bc]);

    React.useEffect(() => {
        return () => {
            pageStore.setPageElAction(null);
            pageStore.setPageInnerElAction(null);
        };
    }, [pageStore]);

    useDisposable(() => {
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
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        focusPageElement(event, pageStore);
    };

    return useObserver(() => {
        const content = (
            <div ref={pageStore.setPageInnerElAction}>
                {pageStore.isEdit ? <div className={classes.backdrop} /> : null}
                <PageLoader
                    pageStore={pageStore}
                    container={pageStore.pageEl}
                    loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"}
                />
                <FormContext.Provider value={form}>
                    <Grid container spacing={2}>
                        {mapComponents(
                            pageStore.pageBc,
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
                                        elevation={theme.palette.type === "light" ? undefined : DARK_PAPER_ELEVATION}
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
                {/* TODO: to make pager as part of content (page) */}
                {/* {bc.defaultvalue ? (
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
                >
                    {content}
                </Scrollbars>
                {/* )} */}
                <PagerWindowMessage pageStore={pageStore} />
                {/* If defaultvalue not empty - pager comes from constructor. Skip duplicate windows */}
                {bc.defaultvalue ? null : <PagerWindows {...props} />}}
            </div>
        );
    });
};
