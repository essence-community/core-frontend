import * as React from "react";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import MobxReactForm from "mobx-react-form";
import {
    Scrollbars,
    mapComponents,
    IClassProps,
    IBuilderConfig,
    PageLoader,
    ApplicationContext,
    FormContext,
    ModeContext,
    EditorContex,
    loggerRoot,
    IEditorContext,
    IPageModel,
    toColumnStyleWidth,
} from "@essence-community/constructor-share";
import {i18next} from "@essence-community/constructor-share/utils";
import {Grid, useTheme} from "@material-ui/core";
import {settingsStore, PageModel} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_VISIBLE_MENU,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {PagerWindows} from "../components/PagerWindows";
import {focusPageElement} from "../utils/focusPageElement";
import {PagerWindowMessage} from "../components/PagerWindowMessage";
import {useStyles} from "./PagerContainer.styles";

const DARK_PAPER_ELEVATION = 8;
const VERTICAL_STYLE = {zIndex: 3};
const SCROLLABRS_STYLE = {height: "100%", paddingRight: 10, width: "100%"};
const logger = loggerRoot.extend("PagerContainer");
const onFormChange = (form: typeof MobxReactForm) => {
    logger(i18next.t("static:f9c3bf3691864f4d87a46a9ba367a855"), form.values());
};

interface IPagerProps extends IClassProps {}

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
    const editor: IEditorContext = React.useMemo(
        () => ({
            form: new MobxReactForm(undefined, {hooks: {onFieldChange: onFormChange}}),
            mode: "1",
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        focusPageElement(event, pageStore);
    };

    return useObserver(() => (
        <div
            ref={pageStore.setPageElAction}
            className={cn(classes.root, {[classes.hidden]: !pageStore.visible})}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
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
                <div ref={pageStore.setPageInnerElAction}>
                    {pageStore.isEdit ? <div className={classes.backdrop} /> : null}
                    <PageLoader
                        pageStore={pageStore}
                        container={pageStore.pageEl}
                        // @ts-ignore
                        loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER]}
                    />
                    <FormContext.Provider value={editor.form}>
                        <ModeContext.Provider value={editor.mode}>
                            <EditorContex.Provider value={editor}>
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
                                                    elevation={
                                                        theme.palette.type === "light"
                                                            ? undefined
                                                            : DARK_PAPER_ELEVATION
                                                    }
                                                />
                                            </Grid>
                                        ),
                                    )}
                                </Grid>
                            </EditorContex.Provider>
                        </ModeContext.Provider>
                    </FormContext.Provider>
                </div>
            </Scrollbars>
            <PagerWindowMessage pageStore={pageStore} />
            <PagerWindows pageStore={pageStore} />
        </div>
    ));
};
