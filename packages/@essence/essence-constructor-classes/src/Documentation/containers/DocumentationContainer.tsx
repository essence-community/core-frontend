import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import ReactMarkdown from "react-markdown";
import {Grid, Typography} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_ID,
    VAR_RECORD_CV_DESCRIPTION,
} from "@essence-community/constructor-share/constants";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {DocumentationModel} from "../store/DocumentationModel";
import {VAR_MANUAL_DOCUMENTATION, VAR_AUTO_DOCUMENTATION} from "../constants";

export const DocumentationContainer: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;

    const [store] = useModel((options) => new DocumentationModel(options), props);

    React.useEffect(() => {
        if (pageStore.route) {
            store.recordsStore.searchAction({[VAR_RECORD_ID]: pageStore.route[VAR_RECORD_ID]});
        }
    }, [pageStore, store]);

    return useObserver(() => {
        const {selectedRecordValues: classInfo} = store.recordsStore;
        const {[VAR_MANUAL_DOCUMENTATION]: manualDoc, [VAR_AUTO_DOCUMENTATION]: autoDoc} = classInfo;

        if (store.recordsStore.isLoading) {
            return (
                <PageLoader
                    container={null}
                    isLoading
                    loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"}
                />
            );
        }

        return (
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography color="textSecondary" align="center" variant="h4">
                        {classInfo.cv_name}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1">{classInfo[VAR_RECORD_CV_DESCRIPTION]}</Typography>
                </Grid>

                <Grid item>
                    <Typography color="textSecondary" align="center" variant="h5">
                        Пользовательская документация
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1">
                        <ReactMarkdown source={typeof manualDoc === "string" ? manualDoc : ""} />
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography color="textSecondary" align="center" variant="h5">
                        Автогенерируемая документация
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1">
                        <ReactMarkdown source={typeof autoDoc === "string" ? autoDoc : ""} />
                    </Typography>
                </Grid>
            </Grid>
        );
    });
};
