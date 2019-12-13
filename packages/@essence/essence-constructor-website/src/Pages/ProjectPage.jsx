// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "recompose";
import {getComponent, ApplicationContext} from "@essence/essence-constructor-share";
import {type ApplicationModelType} from "../Stores/ApplicationModel";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type OwnPropsType = {
    match: {
        params: {
            ckId: string,
        },
    },
    classes?: Object,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

const styles = () => ({
    hidden: {
        display: "none",
    },
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
});

class ProjectPage extends React.Component<PropsType> {
    componentDidMount() {
        this.handleSetPage();
    }

    componentDidUpdate(prevProps: PropsType) {
        const {ckId} = this.props.match.params;

        if (prevProps.match.params.ckId !== ckId) {
            this.handleSetPage();
        }
    }

    handleSetPage = () => {
        const {ckId} = this.props.match.params;
        const {routesStore, pagesStore} = this.props.applicationStore;
        const routes = routesStore.recordsStore.records;
        const pageConfig = routes.find((route) => route.ckId === ckId || route.cvUrl === ckId);

        if (pageConfig) {
            pagesStore.setPageAction(pageConfig.ckId, false);
        } else {
            pagesStore.setPageAction(ckId);
        }
    };

    componentWillUnmount() {
        this.props.applicationStore.pagesStore.removeAllPagesAction();
    }

    render() {
        const {
            classes = {},
            applicationStore: {pagesStore},
        } = this.props;
        const BuilderPage = getComponent("PAGER");

        return (
            <ApplicationContext.Provider value={this.props.applicationStore}>
                <div className={classes.root}>
                    {pagesStore.pages.map((page) => (
                        <BuilderPage key={page.ckPage} pageStore={page} />
                    ))}
                </div>
            </ApplicationContext.Provider>
        );
    }
}

export default compose(inject(mapStoresToProps), withStyles(styles), observer)(ProjectPage);
