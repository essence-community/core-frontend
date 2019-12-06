// @flow
import * as React from "react";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {EditorContex} from "@essence/essence-constructor-share";
import {styleTheme, buttonDirection} from "../../constants";
import {getModeTitle} from "../../utils/string";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import {type HistoryModelType} from "../../stores/HistoryModel";
import {type PanelFormModel} from "../../stores/PanelFormModel";
import {type PageModelType} from "../../stores/PageModel";
import styles from "./BuilderPanelEditingButtonsStyles";

type PropsType = {
    store: HistoryModelType | PanelFormModel,
    classes: Object,
    bc: Object,
    pageStore: PageModelType,
};
const SAVE_COMPONENT_PROPS = {
    type: "submit",
};

class BuilderPanelEditingButtons extends React.Component<PropsType> {
    static contextType = EditorContex;

    handlePerformData = () => {
        const {form} = this.context;

        return {form};
    };

    render() {
        const {classes, store, bc, pageStore} = this.props;
        const {overrides} = store.btnsConfig;
        const isDarkTheme = styleTheme === "dark";

        return (
            <Grid container spacing={1} alignItems="center" direction={buttonDirection}>
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Save Button"]}
                        color="primary"
                        pageStore={pageStore}
                        visible
                        componentProps={SAVE_COMPONENT_PROPS}
                        performData={this.handlePerformData}
                        variant={isDarkTheme ? "fab" : undefined}
                        mini={isDarkTheme}
                        onlyicon={isDarkTheme}
                    />
                </Grid>
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Cancel Button"]}
                        className={classes.cancelButton}
                        pageStore={pageStore}
                        visible
                        onlyicon={isDarkTheme}
                        color="secondary"
                        isEscOpen
                        hideBackdrop={false}
                        hideOnResize={false}
                    />
                </Grid>

                <Grid item className={classes.editModeLabel} data-page-object={`${bc.ckPageObject}-mode-title`}>
                    {getModeTitle(store.mode)}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(BuilderPanelEditingButtons);
