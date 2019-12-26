// @flow
import * as React from "react";
import omit from "lodash/omit";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
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
    Component: React.ComponentType<any>,
};

const OMIT_PROPS = ["visible", "isActive", "pageStore", "bc", "store", "Component"];

class Tab extends React.Component<PropsType> {
    componentDidMount() {
        this.handleChangeHidden();
    }

    componentDidUpdate() {
        this.props.store.setOpenedTab(
            this.props.bc[VAR_RECORD_PAGE_OBJECT_ID],
            !(this.props.disabled || this.props.hidden),
        );

        this.handleChangeHidden();
    }

    handleChangeHidden = () => {
        const {isActive, hidden, store, bc} = this.props;

        store.setTabStatus(bc[VAR_RECORD_PAGE_OBJECT_ID], {
            hidden,
        });

        if (isActive && hidden) {
            requestAnimationFrame(store.setFirstActiveTab);
        }
    };

    render() {
        const {hidden, Component} = this.props;

        return (
            <Component
                style={{display: hidden ? "none" : undefined}}
                {...omit(this.props, OMIT_PROPS)}
                hidden={hidden}
            />
        );
    }
}

export default commonDecorator(Tab);
