// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction} from "mobx";
import {inject, Provider, observer} from "mobx-react";
import memoize from "lodash/memoize";
import {Grid, Button} from "@material-ui/core";
import {BuilderPanel, BuilderForm, withModelDecorator} from "@essence-community/constructor-components";
import {mapComponents} from "@essence-community/constructor-share";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {removeFromStoreByRegex, WithT, withTranslation, i18next} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_NAME,
    VAR_RECORD_CV_SURNAME,
    VAR_RECORD_CD_PERIOD,
    VAR_RECORD_CK_DEPT,
    VAR_RECORD_CV_EMAIL,
    VAR_RECORD_CV_FULL_NAME,
    VAR_RECORD_CV_LOGIN,
    VAR_RECORD_CV_PATRONYMIC,
    VAR_RECORD_CV_TIMEZONE,
    VAR_SETTING_PROJECT_PROFILE_PAGE,
} from "@essence-community/constructor-share/constants";
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
type PropsType = WithT & StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
    authStore: stores.authStore,
});

const getConfig = memoize(() => ({
    [VAR_RECORD_PAGE_OBJECT_ID]: "UserInfo",
    childs: [
        {
            [VAR_RECORD_PAGE_OBJECT_ID]: "theme",
            type: "THEME_COMBO",
        },
        {
            [VAR_RECORD_PAGE_OBJECT_ID]: "lang",
            type: "LANG_COMBO",
        },
    ],
    readonly: "false",
    type: "PANEL",
}));

class MenuProfile extends React.Component<PropsType> {
    prevValues = {};

    disposers: Array<Function> = [];

    componentDidMount() {
        const {applicationStore, pageStore} = this.props;

        pageStore.loadConfigAction(pageStore.pageId, pageStore.applicationStore.session);
        this.disposers.push(reaction(() => applicationStore.isBlock, this.handleBlockUpdate));
    }

    componentWillUnmount() {
        this.disposers.map((disposer) => disposer());
        this.disposers = [];
        this.prevValues = {};
    }

    handleBlockUpdate = (value) => {
        if (!value) {
            this.props.pageStore.stores.forEach((store) => {
                store.reloadStoreAction();
            });
        }
    };

    // eslint-disable-next-line max-statements
    handleSubmit = (values, {form}) => {
        if (this.prevValues[VAR_RECORD_CK_DEPT] !== values[VAR_RECORD_CK_DEPT] && form.has(VAR_RECORD_CK_DEPT)) {
            const field = form.$(VAR_RECORD_CK_DEPT);

            if (field && field.options.bc) {
                this.props.pageStore.changeDeptAction(values[VAR_RECORD_CK_DEPT], values[VAR_RECORD_CV_TIMEZONE]);
            }
        }

        this.prevValues = values;
    };

    handleLogout = () => {
        removeFromStoreByRegex(/_filter_/u);
        this.props.applicationStore.logoutAction();
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {
            authStore: {userInfo},
            pageStore,
            applicationStore,
        } = this.props;
        const initialValues = {
            [VAR_RECORD_CD_PERIOD]: "",
            [VAR_RECORD_CK_DEPT]: userInfo[VAR_RECORD_CK_DEPT],
            [VAR_RECORD_CV_EMAIL]: userInfo[VAR_RECORD_CV_EMAIL],
            [VAR_RECORD_CV_FULL_NAME]: `${userInfo[VAR_RECORD_CV_SURNAME] || ""} ${userInfo[VAR_RECORD_NAME] ||
                ""} ${userInfo[VAR_RECORD_CV_PATRONYMIC] || ""}`,
            [VAR_RECORD_CV_LOGIN]: userInfo[VAR_RECORD_CV_LOGIN],
            lang: i18next.language,
            theme: styleTheme,
        };
        const config = getConfig();

        return (
            <Provider pageStore={pageStore}>
                <ApplicationContext.Provider value={applicationStore}>
                    <div>
                        <BuilderForm
                            initialValues={initialValues}
                            onSubmit={this.handleSubmit}
                            mode="1"
                            submitOnChange
                            onSetValues={this.handleSubmit}
                        >
                            <Grid container spacing={2} direction="column">
                                <Grid item xs>
                                    {mapComponents(pageStore.pageBc, (ChildComponent, childBc) => (
                                        <ChildComponent
                                            key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                            {...this.props}
                                            pageStore={pageStore}
                                            bc={childBc}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs>
                                    <BuilderPanel editing={true} bc={config} pageStore={pageStore} />
                                </Grid>
                                <Grid item xs container justify="flex-end" spacing={1}>
                                    <Grid item>
                                        <Button color="primary" size="small" onClick={this.handleLogout}>
                                            {this.props.t("static:8c0119ba23c74e158c5d50c83884fcb5")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </BuilderForm>
                    </div>
                </ApplicationContext.Provider>
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
                isReadOnly: false,
                pageId: applicationStore.settingsStore.settings[VAR_SETTING_PROJECT_PROFILE_PAGE],
            }),
        "pageStore",
    ),
    withTranslation("meta"),
    observer,
)(MenuProfile);
