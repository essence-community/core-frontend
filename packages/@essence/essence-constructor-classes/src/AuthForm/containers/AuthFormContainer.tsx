/* eslint-disable import/no-unresolved, import/extensions */
import * as React from "react";
import {Grid, Paper, Typography, useTheme, ThemeProvider} from "@material-ui/core";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {
    VAR_SETTING_PROJECT_AUTH_TITLE,
    VAR_RECORD_PAGE_OBJECT_ID,
} from "@essence-community/constructor-share/constants";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {useHistory} from "react-router-dom";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {mapComponents} from "@essence-community/constructor-share/components";
// @ts-ignore
import BuilderForm from "@essence-community/constructor-components/src/Form/BuilderForm";
import {useModel} from "@essence-community/constructor-share/hooks";
import darkLogo from "../images/dark_logo.png";
import lightLogo from "../images/light_logo.png";
import {AuthFormModel} from "../store/AuthFormModel";
import {useStyles} from "./AuthFormContainer.styles";
import {makeTheme} from "./AuthFormContainer.overrides";

export const AuthFormContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const theme: IEssenceTheme = useTheme();
    const themeNew = React.useMemo(() => makeTheme(theme), [theme]);
    const applicationStore = React.useContext(ApplicationContext);
    const history = useHistory();
    const logo = theme.palette.type === "light" ? lightLogo : darkLogo;
    const classes = useStyles(props);

    useModel((options) => new AuthFormModel({...options, applicationStore, history}), props);

    React.useEffect(() => {
        if (applicationStore && applicationStore.authStore.userInfo.session) {
            const {bc: appBc} = applicationStore;

            if (appBc && appBc.redirecturl) {
                history.push(`/${appBc.redirecturl}`);
            }
        }
    }, [applicationStore, history]);

    return (
        <ThemeProvider theme={themeNew}>
            <Grid container justify="center" alignItems="center" className="root-height">
                <Grid item>
                    <Paper classes={{root: classes.paper}} elevation={12}>
                        <Typography variant="body2" classes={{root: classes.typography}}>
                            <img src={logo} alt="logo" height="50" width="50" />
                            {settingsStore.settings[VAR_SETTING_PROJECT_AUTH_TITLE]}
                        </Typography>
                        <BuilderForm pageStore={pageStore} className={classes.form} onSubmit={() => undefined}>
                            <Grid container direction="column" spacing={3}>
                                {mapComponents(bc.childs, (ChidCmp, childBc) => (
                                    <Grid key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} item>
                                        <ChidCmp {...props} bc={childBc} />
                                    </Grid>
                                ))}
                                <Grid item>
                                    <Grid container spacing={3} justify="flex-end">
                                        {mapComponents(bc.bottombtn, (ChidCmp, childBc) => (
                                            <Grid key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} item>
                                                <ChidCmp {...props} bc={childBc} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </BuilderForm>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
