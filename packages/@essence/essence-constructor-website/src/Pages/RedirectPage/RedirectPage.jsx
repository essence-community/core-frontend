/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Button} from "@material-ui/core";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import {loggerRoot, PageLoader, preference} from "@essence/essence-constructor-components";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import {type AuthModelType} from "../../Stores/AuthModel";
import AppBarAuth from "../../Components/AppBarAuth";
import {type StoresType} from "../../Stores/stores";
import {history} from "../../history";
import AppBar from "../../Components/AppBar";
import styles from "./RedirectPageStyles";

type PropsType = {
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
                logger("Страница не обнаружена или заполнена неверно!");
                // eslint-disable-next-line no-negated-condition
            } else if (!params.filter) {
                logger("Не найдена информация о фильтрации!");
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
            applicationStore.redirectToAction(`${params.page}`, camelCaseKeys(params.filter));
        } else if (params) {
            history.push("/auth", {backUrl: `/redirect/${this.props.match.params.b64}`});
        } else {
            history.push("/auth");
        }
    };

    render() {
        const {classes = {}, applicationStore} = this.props;
        const {params} = this.state;
        const isAuthorized = Boolean(applicationStore.session);

        const content = (
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid item>
                    <Grid container className={classes.panel} spacing={1} direction="column" justify="center">
                        <Grid item>Вы пытаетесь перейти на страницу c такими параметрами:</Grid>
                        {params ? (
                            <React.Fragment>
                                <Grid item>Страница: {params.page} </Grid>
                                <Grid item>Фильтр: {JSON.stringify(params.filter)}</Grid>
                            </React.Fragment>
                        ) : (
                            <Grid item>Параметры заданы не верно</Grid>
                        )}
                        <Grid item>Статус авторизации: {isAuthorized ? "авторизирован" : "не авторизирован"}</Grid>
                        <Grid item className={classes.btnContainer}>
                            <Button
                                type="submit"
                                onClick={this.handleClick}
                                classes={{root: classes.button}}
                                disableRipple
                                disabled={!params}
                            >
                                {isAuthorized ? "Продолжить" : "Войти"}
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
                        <PageLoader isLoading loaderType={applicationStore.settingsStore.settings.projectLoader} />
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

export default inject(mapStoresToProps)(withStyles(styles)(observer(RedirectPage)));
