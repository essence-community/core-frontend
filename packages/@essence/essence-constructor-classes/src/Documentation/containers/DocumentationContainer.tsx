import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import ReactMarkdown from "react-markdown";
import {Typography, Divider} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_ID,
    VAR_RECORD_CV_DESCRIPTION,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
} from "@essence-community/constructor-share/constants";
import {PageLoader, makeRenderers} from "@essence-community/constructor-share/uicomponents";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useLocation} from "react-router-dom";
import {reaction} from "mobx";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {DocumentationModel} from "../store/DocumentationModel";
import {VAR_MANUAL_DOCUMENTATION, VAR_AUTO_DOCUMENTATION, VAR_EXAMPLE, VAR_SYS_ROUTER_URL} from "../constants";
import {useStyles} from "./DocumentationContainer.styles";

// eslint-disable-next-line max-lines-per-function
export const DocumentationContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const classes = useStyles();
    const location = useLocation();
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [store] = useModel((options) => new DocumentationModel(options), props);
    const [isLoading, setIsLoagin] = React.useState(true);

    React.useEffect(() => {
        pageStore.globalValues.set(VAR_SYS_ROUTER_URL, pageStore.route?.cv_url);
    }, [pageStore]);

    React.useEffect(() => {
        if (pageStore.route) {
            store.recordsStore.searchAction({[VAR_RECORD_ID]: pageStore.route[VAR_RECORD_ID]});
        }
    }, [pageStore, store]);

    React.useEffect(() => {
        if (props.visible && location.hash && rootRef.current && !isLoading) {
            const anchorElement = rootRef.current.querySelector(`a[href="${location.hash}"]`)?.parentElement;

            if (anchorElement instanceof HTMLDivElement) {
                anchorElement.scrollIntoView();
            }
        }
    }, [isLoading, location.hash, props.visible]);

    React.useEffect(() => reaction(() => store.recordsStore.isLoading, setIsLoagin), [store]);

    const renderers = React.useMemo(() => makeRenderers(pageStore, bc), [bc, pageStore]);

    return useObserver(() => {
        const {selectedRecordValues: classInfo} = store.recordsStore;
        const {[VAR_MANUAL_DOCUMENTATION]: manualDoc, [VAR_AUTO_DOCUMENTATION]: autoDoc} = classInfo;

        if (isLoading) {
            return (
                <PageLoader
                    container={null}
                    isLoading
                    loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"}
                />
            );
        }

        return (
            <div className={classes.root} ref={rootRef}>
                <div className={classes.item}>
                    <Typography color="textPrimary" variant="h4">
                        {classInfo.cv_name}
                    </Typography>
                </div>

                <div className={classes.item}>
                    <Typography color="textSecondary" variant="subtitle1">
                        {classInfo[VAR_RECORD_CV_DESCRIPTION]}
                    </Typography>
                </div>

                {typeof manualDoc === "string" ? (
                    <>
                        <div className={classes.item}>
                            <Divider />
                        </div>

                        <div className={`${classes.item} ${classes.linkRoot}`}>
                            <a href="#manualdoc" className={classes.linkIcon}>
                                <Icon size="1x" iconfont="link" />
                            </a>
                            <Typography color="textPrimary" variant="h5">
                                Пользовательская документация
                            </Typography>
                        </div>

                        <div className={classes.item}>
                            <Typography variant="subtitle1">
                                <ReactMarkdown source={manualDoc} renderers={renderers} />
                            </Typography>
                        </div>
                    </>
                ) : null}

                {typeof autoDoc === "string" ? (
                    <>
                        <div className={classes.item}>
                            <Divider />
                        </div>
                        <div className={`${classes.item} ${classes.linkRoot}`}>
                            <a href="#autodoc" className={classes.linkIcon}>
                                <Icon size="1x" iconfont="link" />
                            </a>
                            <Typography color="textPrimary" variant="h5">
                                Автогенерируемая документация
                            </Typography>
                        </div>

                        <div className={classes.item}>
                            <ReactMarkdown source={autoDoc} renderers={renderers} />
                        </div>
                    </>
                ) : null}

                {!!pageStore.route?.[VAR_EXAMPLE] &&
                    mapComponentOne(
                        {
                            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-demo`,
                            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                            [VAR_RECORD_QUERY_ID]: "MTGetPageObjects",
                            autoload: true,
                            getglobaltostore: `${VAR_SYS_ROUTER_URL}=ck_parent`,
                            type: "DYNAMICPANEL",
                        },
                        (ChildCmp, childBc) => (
                            <>
                                <div className={classes.item}>
                                    <Divider />
                                </div>
                                <div className={`${classes.item} ${classes.linkRoot}`}>
                                    <a href="#autodoc" className={classes.linkIcon}>
                                        <Icon size="1x" iconfont="link" />
                                    </a>
                                    <Typography color="textPrimary" variant="h5">
                                        Пример использования
                                    </Typography>
                                </div>

                                <div className={classes.item}>
                                    <ChildCmp {...props} bc={childBc} />
                                </div>
                            </>
                        ),
                    )}
            </div>
        );
    });
};
