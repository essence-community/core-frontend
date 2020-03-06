// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {DialogActions} from "@material-ui/core";
import {mapComponents, EditorContex} from "@essence-community/constructor-share";
import VAR_RECORD_PAGE_OBJECT_ID from "@essence-community/constructor-share/constants";
import {type PageModelType} from "../../stores/PageModel";

type PropsType = {
    btns?: Array<Object>,
    checkboxAddMode?: React.Node,
    pageStore: PageModelType,
    visible: boolean,
    className?: string,
};

const SAVE_COMPONENT_PROPS = {
    type: "submit",
};

class BuilderWindowButtonCustom extends React.Component<PropsType> {
    static contextType = EditorContex;

    buttons: Array<Object> = [];

    constructor(props: PropsType) {
        super(props);

        if (props.btns) {
            this.buttons = props.btns.map((bc) => ({
                confirmquestion: bc.handler === "onCloseWindow" ? "static:9b475e25ae8a40b0b158543b84ba8c08" : undefined,
                confirmquestionposition: "top",
                ...bc,
            }));
        }
    }

    handlePerformData = () => {
        const {form} = this.context;

        return {form};
    };

    render() {
        const {checkboxAddMode, pageStore, visible, className} = this.props;
        const {form = {}} = this.context;

        return (
            <DialogActions className={className}>
                {checkboxAddMode}
                {mapComponents(this.buttons, (BtnComponent, btn) => (
                    <BtnComponent
                        key={btn[VAR_RECORD_PAGE_OBJECT_ID]}
                        bc={btn}
                        disabled={btn.handler === "onCloseWindow" ? false : !form.isValid || form.submitting}
                        tranformName="window"
                        pageStore={pageStore}
                        visible={visible}
                        performData={this.handlePerformData}
                        componentProps={
                            btn.datatype === "save" || btn.handler === "onSimpleSaveWindow"
                                ? SAVE_COMPONENT_PROPS
                                : undefined
                        }
                    />
                ))}
            </DialogActions>
        );
    }
}

export default observer(BuilderWindowButtonCustom);
