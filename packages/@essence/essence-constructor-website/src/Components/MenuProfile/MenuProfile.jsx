// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction, observe} from "mobx";
import {inject, Provider, observer} from "mobx-react";
import {Grid, Button} from "@material-ui/core";
import {
    BuilderPanel,
    BuilderForm,
    BuilderPageChildren,
    withModelDecorator,
} from "@essence/essence-constructor-components";
import {saveToStore, removeFromStore, removeFromStoreByRegex} from "@essence/essence-constructor-share/utils";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import {type AuthModelType} from "../../Stores/AuthModel";
import {styleTheme} from "../../constants";
import ProfileModel from "../../Stores/ProfileModel";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
};
type OwnPropsType = {
    pageStore: Object,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
    authStore: stores.authStore,
});

const config = {
    childs: [
        {
            ckPageObject: "theme",
            clearable: "false",
            column: "theme",
            cvDisplayed: "Тема",
            datatype: "combo",
            displayfield: "name",
            noglobalmask: "true",
            querymode: "remote",
            type: "IFIELD",
            valuefield: "value",
        },
    ],
    ckPageObject: "UserInfo",
    readonly: "false",
    type: "PANEL",
};

class MenuProfile extends React.Component<PropsType> {
    prevValues = {};

    disposers: Array<Function> = [];

    componentDidMount() {
        const {applicationStore, pageStore} = this.props;

        pageStore.loadConfigAction(pageStore.ckPage, pageStore.applicationStore.session);
        this.disposers.push(observe(pageStore.stores, this.handleChangeStore));
        this.disposers.push(reaction(() => applicationStore.isBlock, this.handleBlockUpdate));
    }

    componentWillUnmount() {
        this.disposers.map((disposer) => disposer());
        this.disposers = [];
        this.prevValues = {};
    }

    handleChangeStore = ({type, newValue: themeStore, name}: Object) => {
        if (type === "add" && name === "theme") {
            themeStore.recordsStore.setRecordsAction([
                {name: "Темная тема", value: "dark"},
                {name: "Светлая тема", value: "light"},
            ]);
            themeStore.changeValueAction(styleTheme);
        }
    };

    handleBlockUpdate = (value) => {
        if (!value) {
            this.props.pageStore.stores.forEach((store) => {
                store.reloadStoreAction();
            });
        }
    };

    handleSubmit = (values, {form}) => {
        if (this.prevValues.ckDept !== values.ckDept && form.has("ckDept")) {
            const field = form.$("ckDept");

            if (field && field.options.bc) {
                this.props.pageStore.changeDeptAction(values.ckDept, values.cvTimezone);
            }
        }
        if (styleTheme !== values.theme) {
            if (values.theme) {
                saveToStore("theme", values.theme);
            } else {
                removeFromStore("theme");
            }
            document.location.reload();
        }

        this.prevValues = values;
    };

    handleLogout = () => {
        removeFromStoreByRegex(/_filter_/);
        this.props.applicationStore.logoutAction();
    };

    render() {
        const {
            authStore: {userInfo},
            pageStore,
        } = this.props;
        const initialValues = {
            cdPeriod: "",
            ckDept: userInfo.ckDept,
            cvEmail: userInfo.cvEmail,
            cvFullName: `${userInfo.cvSurname} ${userInfo.cvName} ${userInfo.cvPatronymic}`,
            cvLogin: userInfo.cvLogin,
            theme: styleTheme,
        };

        return (
            <Provider pageStore={pageStore}>
                <div>
                    <BuilderForm
                        initialValues={initialValues}
                        onSubmit={this.handleSubmit}
                        mode="1"
                        submitOnChange
                        onSetValues={this.handleSubmit}
                    >
                        <Grid container spacing={2} direction="row">
                            <Grid item xs={12}>
                                <BuilderPageChildren
                                    readOnly={pageStore.isReadOnly}
                                    hidden={false}
                                    pageStore={pageStore}
                                    pageBc={pageStore.pageBc}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BuilderPanel editing={true} bc={config} pageStore={pageStore} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justify="flex-end" spacing={1}>
                                    <Grid item>
                                        <Button color="primary" size="small" onClick={this.handleLogout}>
                                            Выход
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </BuilderForm>
                </div>
            </Provider>
        );
    }
}

export default compose(
    inject(mapStoresToProps),
    withModelDecorator(
        (bc, {applicationStore, authStore}) =>
            new ProfileModel({
                applicationStore,
                authStore,
                ckPage: applicationStore.settingsStore.settings.projectProfilePage,
                isReadOnly: false,
            }),
        "pageStore",
    ),
    observer,
)(MenuProfile);
