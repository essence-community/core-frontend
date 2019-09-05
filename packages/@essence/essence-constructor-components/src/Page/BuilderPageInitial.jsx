// @flow
import * as React from "react";
import {PageModel, type PageModelType} from "../stores/PageModel";
import {type ApplicationModelType} from "../stores/StoreTypes";
import {type BuilderPageType} from "./BuilderPageType";
import BuilderPage from "./BuilderPage";

type PropsType = {
    applicationStore: ApplicationModelType,
    pageBc: BuilderPageType,
    ckPage: string,
};

type StateType = {
    pageStore: PageModelType,
};

class BuilderPageInitial extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const {applicationStore, ckPage, pageBc} = props;

        this.state = {
            pageStore: new PageModel({
                applicationStore,
                ckPage,
                initialBc: pageBc,
                isActiveRedirect: false,
            }),
        };
    }

    componentDidMount() {
        this.state.pageStore.loadConfigAction(this.props.ckPage, this.props.applicationStore.session);
    }

    render() {
        return <BuilderPage {...this.props} pageStore={this.state.pageStore} visible />;
    }
}

export default BuilderPageInitial;
