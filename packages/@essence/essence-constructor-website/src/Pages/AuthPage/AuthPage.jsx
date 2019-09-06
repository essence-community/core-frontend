/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {PageLoader} from "@essence/essence-constructor-components";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {getFromStore} from "@essence/essence-constructor-share/utils";
import {MobxForm} from "../../Components/MobxForm";
import {AuthModelType} from "../../Stores/AuthModel";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import {type StoresType} from "../../Stores/stores";
import AppBarAuth from "../../Components/AppBarAuth";
import {styleTheme} from "../../constants";
import * as lightLogo from "../../images/light_logo.png";
import * as darkLogo from "../../images/dark_logo.png";
import styles from "./AuthPageStyles";

const logo = styleTheme === "light" ? lightLogo : darkLogo;

type StoresPropsType = {
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
};
type OwnPropsType = {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    history?: History,
};
type PropsType = StoresPropsType & OwnPropsType;

type StateType = {
    loaded: boolean,
    showPassword: boolean,
    form: any,
};
const FIELD_LOGIN_LENGTH = 30;
const FIELD_MAX_LENGTH = 40;
const mapStoresToProps = (stores: StoresType): StoresPropsType => ({
    applicationStore: stores.applicationStore,
    authStore: stores.authStore,
});

class AuthPage extends React.Component<PropsType, StateType> {
    state = {
        form: null,
        loaded: false,
        showPassword: false,
    };

    componentDidMount() {
        this.setState({loaded: true});
        const userInfo = getFromStore("auth", {});
        const {authStore, history} = this.props;

        this.setState({
            form: new MobxForm({
                fields: this.getFieldsConfigs(),
                hooks: {
                    onSuccess: this.handleLogin,
                },
            }),
        });

        if (userInfo.session) {
            authStore.successLoginAction(userInfo, history);
        }

        authStore.checkAuthAction(history);
    }

    handleToggleShowPassword = () => {
        this.setState((prevState: StateType) => ({showPassword: !prevState.showPassword}));
    };

    handleLogin = async (form) => {
        const {authStore, history} = this.props;

        await form.validate({showErrors: true});

        if (form.isValid && authStore) {
            authStore.loginAction(form.values(), history);
        }
    };

    getFieldsConfigs = () => [
        {
            autoFocus: false,
            disabled: false,
            id: "cvLogin",
            margin: "normal",
            name: "cvLogin",
            placeholder: "Имя пользователя",
            rules: "required",
            title: "Имя пользователя",
        },
        {
            autoFocus: false,
            disabled: false,
            id: "cvPassword",
            margin: "normal",
            name: "cvPassword",
            placeholder: "Пароль",
            rules: "required",
            title: "Пароль",
        },
    ];

    renderLoginField = ({input}) => {
        const {classes} = this.props;

        const endAdornment = (
            <InputAdornment position="end" className={classes.inputAdornment}>
                <IconButton
                    color="secondary"
                    className={input.value ? classes.buttonAdorment : classes.buttonAdormentHidden}
                    key="clear-value"
                    onClick={() => {
                        if (input.onChange) {
                            input.onChange("");
                        }
                    }}
                    tabIndex={-1}
                    disableRipple
                >
                    <Icon iconfont="times" size="xs" />
                </IconButton>
            </InputAdornment>
        );

        return (
            <TextField
                {...input}
                className={classes.textField}
                InputProps={{
                    classes: {
                        formControl: classes.formControl,
                        input: classes.inputRoot,
                        root: classes.placeholder,
                        underline: classes.underline,
                    },
                    endAdornment,
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    maxLength: FIELD_LOGIN_LENGTH,
                }}
            />
        );
    };

    renderPasswordField = ({input}) => {
        const {classes} = this.props;
        const {showPassword} = this.state;

        const endAdornment = (
            <InputAdornment position="end" className={classes.inputAdornment}>
                <IconButton
                    color="secondary"
                    className={input.value ? classes.buttonAdorment : classes.buttonAdormentHidden}
                    key="eye-password"
                    onClick={this.handleToggleShowPassword}
                    tabIndex={-1}
                    disableRipple
                >
                    <Icon iconfont={showPassword ? "eye-slash" : "eye"} size="xs" />
                </IconButton>

                <IconButton
                    color="secondary"
                    className={input.value ? classes.buttonAdorment : classes.buttonAdormentHidden}
                    key="clear-value"
                    onClick={() => {
                        input.onChange("");
                    }}
                    tabIndex={-1}
                    disableRipple
                >
                    <Icon iconfont="times" size="xs" />
                </IconButton>
            </InputAdornment>
        );

        return (
            <TextField
                {...input}
                className={classes.textField}
                InputProps={{
                    classes: {
                        formControl: classes.formControl,
                        input: classes.inputRoot,
                        root: classes.placeholder,
                        underline: classes.underline,
                    },
                    endAdornment,
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    maxLength: FIELD_MAX_LENGTH,
                    type: showPassword ? "text" : "password",
                }}
            />
        );
    };

    render() {
        const {classes, applicationStore} = this.props;
        const {form} = this.state;

        if (!form) {
            return null;
        }

        return (
            <React.Fragment>
                {applicationStore.mode === "reports" ? null : <AppBarAuth />}
                <Grid container justify="center" alignItems="center" className="root-height">
                    <Grid item>
                        <Paper classes={{root: classes.paper}} elevation={12}>
                            <Typography classes={{root: classes.typography}}>
                                <img src={logo} alt="logo" height="50" width="50" />
                                {applicationStore.settingsStore.settings.projectAuthTitle}
                            </Typography>
                            <form>
                                <PageLoader
                                    isLoading={form.submitting}
                                    loaderType={applicationStore.settingsStore.settings.projectLoader}
                                />
                                <Grid container direction="column" justyfy="space-between" spacing={24}>
                                    <Grid item>{this.renderLoginField({input: form.$("cvLogin").bind()})}</Grid>
                                    <Grid item>
                                        {this.renderPasswordField({
                                            input: form.$("cvPassword").bind(),
                                        })}
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            onClick={form.onSubmit}
                                            classes={{disabled: classes.disabled, root: classes.button}}
                                            disabled={form.submitting || !form.isValid}
                                            disableRipple
                                        >
                                            Войти
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default inject(mapStoresToProps)(withStyles(styles)(observer(AuthPage)));
