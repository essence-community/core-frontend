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
} from "@essence/essence-constructor-share";
import {Grid, useTheme} from "@material-ui/core";
import {settingsStore, PageModel} from "@essence/essence-constructor-share/models";
import {PagerWindows} from "../components/PagerWindows";
import {focusPageElement} from "../utils/focusPageElement";
import {PagerWindowMessage} from "../components/PagerWindowMessage";
import {useStyles} from "./PagerContainer.styles";

const DARK_PAPER_ELEVATION = 8;
const VERTICAL_STYLE = {zIndex: 3};
const SCROLLABRS_STYLE = {height: "100%", paddingRight: 10, width: "100%"};
const logger = loggerRoot.extend("PagerContainer");
const onFormChange = (form: typeof MobxReactForm) => {
    logger("Данные изменены вне формы:", form.values());
};

interface IPagerProps extends IClassProps {}

export const PagerContainer: React.FC<IPagerProps> = (props) => {
    const applicationStore = React.useContext(ApplicationContext);
    /**
     * We are making a new pageStore when we get defaultvalue.
     * It means that we want to make custom page and getting them from server by bc.ck_query
     */
    const pageStore: IPageModel | undefined = React.useMemo(() => {
        if (applicationStore && props.bc && props.bc.defaultvalue) {
            const newPageStore = new PageModel({
                applicationStore,
                ckPage: props.bc.defaultvalue,
                defaultVisible: true,
                isActiveRedirect: false,
            });

            newPageStore.loadConfigAction(props.bc.defaultvalue);

            return newPageStore;
        }

        return props.pageStore;
    }, [applicationStore, props.bc, props.pageStore]);

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
        if (route && !route.clMenu) {
            setTimeout(() => {
                if (applicationStore) {
                    applicationStore.pagesStore.removePageAction(pageStore.ckPage);
                }
            });
        }
    }, [applicationStore, pageStore.ckPage, route]);

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
                        loaderType={settingsStore.settings.projectLoader}
                    />
                    <FormContext.Provider value={editor.form}>
                        <ModeContext.Provider value={editor.mode}>
                            <EditorContex.Provider value={editor}>
                                <Grid container spacing={2}>
                                    {mapComponents(
                                        pageStore.pageBc,
                                        (ChildComponent: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                            <Grid key={childBc.ckPageObject} item xs={12}>
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
