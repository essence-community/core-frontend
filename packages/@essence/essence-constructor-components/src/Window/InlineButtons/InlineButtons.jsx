// @flow
import * as React from "react";
import {observer} from "mobx-react";
import compose from "recompose/compose";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {EditorContex} from "@essence/essence-constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {styleTheme} from "../../constants";
import {getModeTitle} from "../../utils/string";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type WindowModelType} from "../../stores/WindowModel";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import styles from "./InlineButtonsStyles";

type PropsType = {
    store: WindowModelType,
    gridStore: GridModelType,
    pageStore: PageModelType,
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
};

class InlineButtons extends React.Component<PropsType> {
    static contextType = EditorContex;

    handlePerformData = () => {
        const {form} = this.context;

        return {form};
    };

    render() {
        const {store, gridStore, pageStore, classes} = this.props;
        const {overrides} = gridStore.gridBtnsConfig;
        const isDarkTheme = styleTheme === "dark";

        return (
            <Grid container spacing={1} alignItems="center" direction={isDarkTheme ? "column" : "row"}>
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Save Button"]}
                        className={classes.saveButton}
                        pageStore={pageStore}
                        visible
                        onlyicon={isDarkTheme}
                        performData={this.handlePerformData}
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
                        handleClick={store.closeAction}
                        isEscOpen
                        hideBackdrop={false}
                        hideOnResize={false}
                    />
                </Grid>
                <Grid
                    item
                    className={classes.label}
                    data-page-object={`${store.windowBc[VAR_RECORD_PAGE_OBJECT_ID]}-mode-title`}
                >
                    {getModeTitle(store.config.mode)}
                </Grid>
            </Grid>
        );
    }
}

export default compose(withStyles(styles), observer)(InlineButtons);
