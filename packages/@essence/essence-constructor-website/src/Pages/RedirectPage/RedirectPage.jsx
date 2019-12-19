// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Button} from "@material-ui/core";
import {compose} from "recompose";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import {PageLoader} from "@essence/essence-constructor-share";
import {loggerRoot, preference} from "@essence/essence-constructor-components";
import {VAR_SETTING_PROJECT_LOADER} from "@essence/essence-constructor-share/constants";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import {type AuthModelType} from "../../Stores/AuthModel";
import AppBarAuth from "../../Components/AppBarAuth";
import {type StoresType} from "../../Stores/stores";
import {history} from "../../history";
import AppBar from "../../Components/AppBar";
import styles from "./RedirectPageStyles";

type PropsType = WithT & {
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
    classes?: Object,
    match: {
        params: {
            b64: string,
        },
    },
};

type IStateParams = {|
    page: string,
    filter: Object,
|};

type StateType = {|
    params: ?IStateParams,
|};

type StoresPropsType = {
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
};

const logger = loggerRoot.extend("RedirectPage");
const mapStoresToProps = (stores: StoresType): StoresPropsType => ({
    applicationStore: stores.applicationStore,
    authStore: stores.authStore,
});

/*
 * Convert from data into b64
 * b64 = encodeURIComponent(btoa(unescape(encodeURIComponent(str))));
 * str = decodeURIComponent(escape(window.atob(decodeURIComponent(b64))));
 */
class RedirectPage extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            params: this.handleGetParams(),
        };
    }

    async componentDidMount() {
        const {applicationStore} = this.props;

        if (applicationStore.session && !applicationStore.isApplicationReady) {
            await applicationStore.loadApplicationAction();
        }

        if (!preference.redirectDebugWindow) {
            this.handleClick();
        }
    }

    handleGetParams = (): ?IStateParams => {
        try {
            const data = decodeURIComponent(escape(window.atob(decodeURIComponent(this.props.match.params.b64))));
            const params = JSON.parse(data);

            if (!params.page) {
                logger(this.props.t("1764da1153734ec8b4fc4cf48cc78c88"));
                // eslint-disable-next-line no-negated-condition
            } else if (!params.filter) {
                logger(this.props.t("e7f66e6d5b5340909ea4ded06f5a034f"));
            } else {
                return params;
            }
        } catch (error) {
            logger(error);
        }

        return undefined;
    };

    handleClick = () => {
        const {applicationStore} = this.props;
        const {params} = this.state;

        if (params && applicationStore.session) {
            applicationStore.redirectToAction(`${params.page}`, params.filter);
        } else if (params) {
            history.push("/auth", {backUrl: `/redirect/${this.props.match.params.b64}`});
        } else {
            history.push("/auth");
        }
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {classes = {}, applicationStore, t} = this.props;
        const {params} = this.state;
        const isAuthorized = Boolean(applicationStore.session);

        const content = (
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid item>
                    <Grid container className={classes.panel} spacing={1} direction="column" justify="center">
                        <Grid item>{t("b35d5fa33cb14a1db46c4f684dc14037")}</Grid>
                        {params ? (
                            <React.Fragment>
                                <Grid item>{t("6f93ca102d5f488aa3082e0344486e9e", {page: params.page})}</Grid>
                                <Grid item>
                                    {t("dda349a2de0049408168eb5d148442df", {filter: JSON.stringify(params.filter)})}
                                </Grid>
                            </React.Fragment>
                        ) : (
                            <Grid item>{t("86d945313cbd41beb5f5068c2696bcec")}</Grid>
                        )}
                        <Grid item>
                            {t("6512d68884cd4848ba6129655dec51d4", {
                                status: isAuthorized
                                    ? t("0d9c5a0b816947a781f02baad2c2ce22")
                                    : t("e8281a11d60542c684f76ffab31216aa"),
                            })}
                        </Grid>
                        <Grid item className={classes.btnContainer}>
                            <Button
                                type="submit"
                                onClick={this.handleClick}
                                classes={{root: classes.button}}
                                disableRipple
                                disabled={!params}
                            >
                                {isAuthorized
                                    ? t("fad9bcdb1bf54640ab58d1781546c72c")
                                    : t("82eafeb106eb41aaa205152471b1b7b6")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );

        if (isAuthorized) {
            return (
                <AppBar>
                    {applicationStore.isApplicationReady ? (
                        content
                    ) : (
                        <PageLoader
                            isLoading
                            loaderType={applicationStore.settingsStore.settings[VAR_SETTING_PROJECT_LOADER]}
                        />
                    )}
                </AppBar>
            );
        }

        return (
            <React.Fragment>
                {applicationStore.mode === "reports" ? null : <AppBarAuth />}
                {content}
            </React.Fragment>
        );
    }
}

export default compose(inject(mapStoresToProps), withStyles(styles), withTranslation("meta"), observer)(RedirectPage);
