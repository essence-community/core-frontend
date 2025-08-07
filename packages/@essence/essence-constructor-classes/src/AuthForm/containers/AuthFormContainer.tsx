import * as React from "react";
import {Grid, Paper, Typography, useTheme, ThemeProvider as MuiThemeProvider} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {
    VAR_SETTING_PROJECT_AUTH_TITLE,
    VAR_RECORD_PAGE_OBJECT_ID,
} from "@essence-community/constructor-share/constants";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {useHistory} from "react-router-dom";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {mapComponents} from "@essence-community/constructor-share/components";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {useModel} from "@essence-community/constructor-share/hooks";
import darkLogo from "../images/dark_logo.png";
import lightLogo from "../images/light_logo.png";
import {AuthFormModel} from "../store/AuthFormModel";
import {IBuilderClassConfig} from "../types";
import {useStyles} from "./AuthFormContainer.styles";
import {makeTheme} from "./AuthFormContainer.overrides";

export const AuthFormContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {pageStore, bc} = props;
    const theme: IEssenceTheme = useTheme<IEssenceTheme>();
    const themeNew = React.useMemo(() => makeTheme(theme), [theme]);
    const applicationStore = React.useContext(ApplicationContext);
    const history = useHistory();
    const logo = theme.essence.layoutTheme === 1 ? lightLogo : darkLogo;
    const classes = useStyles(props);

    const [store] = useModel((options) => new AuthFormModel({...options, applicationStore, history}), props);

    React.useEffect(() => {
        if (applicationStore && applicationStore.authStore.userInfo.session) {
            const {bc: appBc} = applicationStore;

            if (appBc && appBc.redirecturl) {
                history.push(`/${appBc.redirecturl}`);
            }
        }
    }, [applicationStore, history]);

    return (
        <MuiThemeProvider theme={themeNew}>
            <ThemeProvider theme={themeNew}>
                <Grid container justifyContent="center" alignItems="center" className="root-height">
                    <Grid>
                        <Paper classes={{root: classes.paper}} elevation={0}>
                            <Grid
                                container
                                justifyContent="start"
                                alignItems="center"
                                spacing={2}
                                sx={{textAlign: "center", width: "calc(100% - 104px)"}}
                            >
                                <Grid justifyContent="center" alignItems="center" sx={{width: "30%"}}>
                                    <img src={logo} alt="logo" height="90" width="102" />
                                </Grid>
                                <Grid size="grow" alignItems="center" justifyContent="center">
                                    <Typography variant="body2" classes={{root: classes.typography}}>
                                        {settingsStore.settings[VAR_SETTING_PROJECT_AUTH_TITLE]}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <UIForm
                                bc={bc}
                                pageStore={pageStore}
                                className={classes.form}
                                onSubmit={store.handleSubmit}
                                placement="auth"
                            >
                                <Grid container direction="column" spacing={3} sx={{width: "100%"}}>
                                    {mapComponents(bc.childs, (ChidCmp, childBc) => (
                                        <Grid key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                            <ChidCmp {...props} bc={childBc} />
                                        </Grid>
                                    ))}
                                    <Grid>
                                        <button hidden />
                                        <Grid container spacing={3} justifyContent="flex-end">
                                            {mapComponents(bc.bottombtn, (ChidCmp, childBc) => (
                                                <Grid key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                                    <ChidCmp {...props} bc={childBc} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </UIForm>
                        </Paper>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </MuiThemeProvider>
    );
};
