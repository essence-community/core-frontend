// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import {DialogActions} from "@material-ui/core";
import {mapComponents} from "@essence/essence-constructor-share";
import {type PageModelType} from "../../stores/PageModel";

type PropsType = {
    btns?: Array<Object>,
    checkboxAddMode?: React.Node,
    pageStore: PageModelType,
    visible: boolean,
};

const SAVE_COMPONENT_PROPS = {
    type: "submit",
};

class BuilderWindowButtonCustom extends React.Component<PropsType> {
    static contextTypes = {
        form: PropTypes.object,
    };

    buttons: Array<Object> = [];

    constructor(props: PropsType) {
        super(props);

        if (props.btns) {
            this.buttons = props.btns.map((bc) => ({
                confirmquestion: bc.handler === "onCloseWindow" ? "Отменить?" : undefined,
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
        const {checkboxAddMode, pageStore, visible} = this.props;
        const {form = {}} = this.context;

        return (
            <DialogActions>
                {checkboxAddMode}
                {mapComponents(this.buttons, (BtnComponent, btn) => (
                    <BtnComponent
                        key={btn.ckPageObject}
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
