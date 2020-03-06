// @flow
import * as React from "react";
import {DialogActions} from "@material-ui/core";
import {EditorContex} from "@essence-community/constructor-share";
import {type WindowModelType} from "../../stores/WindowModel";
import {type PageModelType} from "../../stores/PageModel";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import {type GridModelType} from "../../stores/GridModel";

type PropsType = {
    store: WindowModelType,
    ckPageObject: string,
    checkboxAddMode?: React.Node,
    pageStore: PageModelType,
    visible: boolean,
    gridStore: GridModelType,
    className?: string,
};

const SAVE_COMPONENT_PROPS = {
    type: "submit",
};

class BuilderWindowButtonDefault extends React.PureComponent<PropsType> {
    static contextType = EditorContex;

    handlePerformData = () => {
        const {form} = this.context;

        return {form};
    };

    render() {
        const {checkboxAddMode, pageStore, visible, gridStore, className} = this.props;
        const {overrides} = gridStore.gridBtnsConfig;

        return (
            <DialogActions className={className}>
                {checkboxAddMode}
                <BuilderMobxButton
                    bc={overrides["Override Save Button"]}
                    color="primary"
                    pageStore={pageStore}
                    visible={visible}
                    componentProps={SAVE_COMPONENT_PROPS}
                    performData={this.handlePerformData}
                />
                <BuilderMobxButton
                    bc={overrides["Override Cancel Button"]}
                    pageStore={pageStore}
                    visible={visible}
                    performData={this.handlePerformData}
                />
            </DialogActions>
        );
    }
}

export default BuilderWindowButtonDefault;
