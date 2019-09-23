// @flow
import * as React from "react";
import {Tab as MaterialTab} from "@material-ui/core";
import omit from "lodash/omit";
import commonDecorator from "../decorators/commonDecorator";
import {type PageModelType} from "../stores/PageModel";
import {type TabModelType} from "../stores/TabModel";

type PropsType = {
    bc: Object,
    hidden?: boolean,
    visible: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    record?: Object,
    pageStore: PageModelType,
    isActive: boolean,
    store: TabModelType,
};

const OMIT_PROPS = ["visible", "isActive", "pageStore", "bc", "store"];

class Tab extends React.Component<PropsType> {
    componentDidMount() {
        this.handleChangeHidden();
    }

    componentDidUpdate() {
        this.props.store.setOpenedTab(this.props.bc.ckPageObject, !(this.props.disabled || this.props.hidden));

        this.handleChangeHidden();
    }

    handleChangeHidden = () => {
        const {isActive, hidden, store, bc} = this.props;

        store.setTabStatus(bc.ckPageObject, {
            hidden,
        });

        if (isActive && hidden) {
            requestAnimationFrame(store.setFirstActiveTab);
        }
    };

    render() {
        const {hidden} = this.props;

        return (
            <MaterialTab
                style={{display: hidden ? "none" : undefined}}
                {...omit(this.props, OMIT_PROPS)}
                hidden={hidden}
            />
        );
    }
}

export default commonDecorator(Tab);
