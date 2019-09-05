// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {PageLoader} from "@essence/essence-constructor-components";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import AppBar from "../../Components/AppBar";
import ReportsContent from "../../Components/ReportsContent/ReportsContent";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type OwnPropsType = {
    children: React.Node,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

class AuthorizationPage extends React.Component<PropsType> {
    componentDidMount() {
        const {applicationStore} = this.props;

        if (applicationStore.session) {
            if (process.env.REACT_APP_REQUEST !== "MOCK") {
                applicationStore.initWsClient(applicationStore.session);
            }

            if (!applicationStore.isApplicationReady) {
                applicationStore.loadApplicationAction();
            }
        } else {
            // TODO: Тексты ошибок не загружаются, если нужны до авторизации, добавить сюда загрузку
            applicationStore.logoutAction();
        }
    }

    render() {
        const {children, applicationStore} = this.props;

        switch (true) {
            case !applicationStore.isApplicationReady:
                return <PageLoader isLoading loaderType={applicationStore.settingsStore.settings.projectLoader} />;
            case applicationStore.mode === "reports":
                return <ReportsContent>{children}</ReportsContent>;
            default:
                return <AppBar>{children}</AppBar>;
        }
    }
}

export default inject(mapStoresToProps)(observer(AuthorizationPage));
