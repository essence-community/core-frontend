// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Dialog, DialogTitle, DialogContent, Typography, ButtonBase} from "@material-ui/core";
import {sanitizeHtml, WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import {styleTheme, COMMIT_ID, BRANCH_DATE_TIME, BRANCH_NAME} from "../../constants";
import * as lightLogo from "../../images/light_logo.png";
import * as darkLogo from "../../images/dark_logo.png";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import styles from "./AppInfoStyles";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};

type PropsType = WithT & {
    applicationStore: ApplicationModelType,
    classes?: Object,
};
type StateType = {
    open: boolean,
};

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

const logo = styleTheme === "light" ? lightLogo : darkLogo;

class AppInfo extends React.Component<PropsType, StateType> {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {applicationStore, classes = {}} = this.props;
        const {open} = this.state;

        return (
            <React.Fragment>
                <ButtonBase classes={{root: classes.button}} disableRipple onClick={this.handleOpen} tabIndex="-1">
                    <img src={logo} alt="logo" height="38" width="38" />
                </ButtonBase>
                <Dialog
                    open={open}
                    fullWidth
                    classes={{paper: classes.dialogPaper}}
                    onClose={this.handleClose}
                    style={{position: "absolute"}}
                >
                    <DialogTitle disableTypography>{this.props.t("6cf398ee03df42529323bd4ff9f584d5")}</DialogTitle>
                    <DialogContent>
                        <Typography variant="title" paragraph className={classes.title}>
                            {applicationStore.settingsStore.settings.projectAboutBoxTitle}
                        </Typography>

                        <Typography variant="body2" paragraph>
                            {this.props.t("26686005b3584a12aeb9ca9e96e54753", {
                                BRANCH_DATE_TIME,
                                BRANCH_NAME,
                                COMMIT_ID,
                            })}
                        </Typography>
                        {applicationStore.settingsStore.settings.projectAboutBoxDescription ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(
                                        applicationStore.settingsStore.settings.projectAboutBoxDescription,
                                    ),
                                }}
                            />
                        ) : null}
                        {applicationStore.settingsStore.settings.projectAboutBoxFooter ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(
                                        applicationStore.settingsStore.settings.projectAboutBoxFooter.replace(
                                            /\{REACT_APP_PUBLIC_URL\}/gi,
                                            process.env.REACT_APP_PUBLIC_URL || "",
                                        ),
                                    ),
                                }}
                            />
                        ) : null}
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default compose(
    inject(mapStoresToProps),
    withStyles(styles),
    withTranslation("meta"),
    observer,
)(AppInfo);
