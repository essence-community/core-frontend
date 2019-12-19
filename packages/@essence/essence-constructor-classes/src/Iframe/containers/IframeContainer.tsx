import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {Paper} from "@material-ui/core";
import {useModel} from "@essence/essence-constructor-share/hooks";
import {ApplicationContext} from "@essence/essence-constructor-share/context";
import {toSize} from "@essence/essence-constructor-share/utils";
import {IClassProps} from "@essence/essence-constructor-share/types";
import {LineLoader} from "@essence/essence-constructor-share/uicomponents";
import {settingsStore} from "@essence/essence-constructor-share/models";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_SETTING_PROJECT_LOADER} from "@essence/essence-constructor-share/constants";
import {IframeModel} from "../store/IframeModel";
import {IFrame} from "../components/IFrame";
import {useStyles} from "./IframeContainer.styles";

export const IframeContainer: React.FC<IClassProps> = (props) => {
    const classes = useStyles({});
    const {bc, pageStore, disabled, hidden, visible, elevation} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new IframeModel(options), {
        applicationStore,
        bc,
        disabled,
        hidden,
        pageStore,
    });
    const height = bc.height ? toSize(bc.height) : undefined;

    return useObserver(() => {
        if (hidden || !visible) {
            return null;
        }

        const content = (
            <div className={classes.root} style={{height}}>
                {disabled ? <div className={classes.disabled} /> : null}
                {store.recordsStore.isLoading ? (
                    <div className={classes.loaderContainer}>
                        <LineLoader loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER]} size={100} />
                    </div>
                ) : (
                    <IFrame height={height} bc={bc} value={store.value} typeiframe={store.typeiframe} />
                )}
            </div>
        );

        if (elevation) {
            return (
                <Paper
                    elevation={elevation}
                    className="paper-overflow-hidden"
                    data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                >
                    {content}
                </Paper>
            );
        }

        return content;
    });
};
