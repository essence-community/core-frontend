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
} from "@essence-community/constructor-share/constants";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useLocation} from "react-router-dom";
import {reaction} from "mobx";
import {DocumentationModel} from "../store/DocumentationModel";
import {VAR_MANUAL_DOCUMENTATION, VAR_AUTO_DOCUMENTATION} from "../constants";
import {useStyles} from "./DocumentationContainer.styles";

export const DocumentationContainer: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;
    const classes = useStyles();
    const location = useLocation();
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [store] = useModel((options) => new DocumentationModel(options), props);
    const [isLoading, setIsLoagin] = React.useState(true);

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
                                <ReactMarkdown source={typeof manualDoc === "string" ? manualDoc : ""} />
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
                            <ReactMarkdown source={typeof autoDoc === "string" ? autoDoc : ""} />
                        </div>
                    </>
                ) : null}
            </div>
        );
    });
};
