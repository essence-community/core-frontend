import * as React from "react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {useHistory, useParams} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {
    VAR_RECORD_CV_TOKEN,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_CV_LOGIN,
    VAR_RECORD_CA_ACTIONS,
} from "@essence-community/constructor-share/constants";
import {SideResizer} from "@essence-community/constructor-share/uicomponents";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useStyles} from "./StaticReportsContainer.styles";

const MENU_GRID_WIDTH = "15%";

export const StaticReportsContainer: React.FC<IClassProps> = (props) => {
    const history = useHistory();
    const applicationStore = React.useContext(ApplicationContext);

    const classes = useStyles();
    const {session = "", token} = useParams();
    const [isReady, setIsReady] = React.useState(false);
    const [width, setWidth] = React.useState(MENU_GRID_WIDTH);
    const pagesTreeBc = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_PAGE_OBJECT_ID]: "PAGES_TREE",
            [VAR_RECORD_PARENT_ID]: props.bc[VAR_RECORD_PAGE_OBJECT_ID],
            type: "PAGES_TREE",
        }),
        [props.bc],
    );
    const pagesBc = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_PAGE_OBJECT_ID]: "PAGES",
            [VAR_RECORD_PARENT_ID]: props.bc[VAR_RECORD_PAGE_OBJECT_ID],
            type: "PAGES",
        }),
        [props.bc],
    );

    React.useEffect(() => {
        const authStore = applicationStore?.authStore;

        if (history.location.pathname.indexOf(applicationStore.url) != 1) {
            return;
        }

        history.replace(history.location.pathname, {backUrl: "/reports"});

        const processLogin = async () => {
            if (authStore && (session || token)) {
                if (session) {
                    authStore.successLoginAction(
                        {
                            [VAR_RECORD_CA_ACTIONS]: [],
                            [VAR_RECORD_CV_LOGIN]: "",
                            session,
                        },
                        history,
                    );
                } else if (token) {
                    await authStore.loginAction({
                        authValues: {
                            [VAR_RECORD_CV_TOKEN]: token || "",
                        },
                        history,
                    });
                }

                if (applicationStore) {
                    await applicationStore.reloadApplication("reports");
                }
            }

            setIsReady(true);
        };

        processLogin();
    }, [applicationStore, history, session, token]);

    if (isReady) {
        return (
            <Grid container wrap="nowrap" className={classes.root}>
                <Grid item className={classes.menu} style={{width}} zeroMinWidth>
                    {mapComponents([pagesTreeBc], (ChildCmp, childBc) => (
                        <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                    ))}
                </Grid>
                <Grid item>
                    <SideResizer
                        anchor="left"
                        minDrawerWidth={MENU_GRID_WIDTH}
                        maxDrawerWidth="50%"
                        onChangeWidth={setWidth}
                    />
                </Grid>
                <Grid item xs className={classes.content}>
                    {mapComponents([pagesBc], (ChildCmp, childBc) => (
                        <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                    ))}
                </Grid>
            </Grid>
        );
    }

    return null;
};
