import * as React from "react";
import {Grid, Button} from "@material-ui/core";
import {IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {loggerRoot} from "@essence-community/constructor-share/constants";
import {useTranslation, getPreference, decodePathUrl, encodePathUrl} from "@essence-community/constructor-share/utils";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {useParams, useHistory} from "react-router-dom";
import {redirectAuth} from "@essence-community/constructor-share/utils/redirect";
import {useStyles} from "./StaticRedirectContainer.styles";

/**
 * How to use:
 *
 * app = pages
 * page = 1s
 * filter = {ck_page: 3}
 *
 * example json:
 *
 * json = { app: "pages", page: "1", filter: {ck_page: 3}}
 *
 * Fromat to b64:
 *
 * b64 = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(json)))))
 *
 * Result link:
 *
 * /redirect/eyJhcHAiOiJwYWdlcyIsInBhZ2UiOiIxIiwiZmlsdGVyIjp7ImNrX3BhZ2UiOjN9fQ%3D%3D
 */

interface IStateParams {
    app?: string;
    page: string;
    filter: IRecord;
}

const logger = loggerRoot.extend("RedirectPage");

interface IUrlParams {
    b64?: string;
}

export const StaticRedirectContainer: React.FC<IClassProps> = () => {
    const preference = getPreference();
    const history = useHistory();
    const applicationStore = React.useContext(ApplicationContext);
    const [trans] = useTranslation();
    const {b64 = ""} = useParams<IUrlParams>();
    const classes = useStyles();
    const handleGetParams = (): IStateParams | undefined => {
        try {
            const params = decodePathUrl(b64, {} as IStateParams);

            if (!params.page) {
                logger(trans("static:1764da1153734ec8b4fc4cf48cc78c88"));
                // eslint-disable-next-line no-negated-condition
            } else if (!params.filter) {
                logger(trans("static:e7f66e6d5b5340909ea4ded06f5a034f"));
            } else {
                return params;
            }
        } catch (error) {
            logger(error);
        }

        return undefined;
    };
    const params = React.useMemo<IStateParams | undefined>(handleGetParams, []);
    const isAuthorized = Boolean(applicationStore?.authStore.userInfo.session);
    const handleClick = React.useCallback(() => {
        if (params && isAuthorized) {
            const filter = params.filter && encodePathUrl(params.filter);

            history.replace(`/${params.app || "pages"}/${params.page}${filter ? `/${filter}` : ""}`);
        } else if (params) {
            redirectAuth({
                backUrl: `/redirect/${b64}`,
                history,
                pageStore: applicationStore.pageStore,
            });
        } else {
            redirectAuth({
                history,
                pageStore: applicationStore.pageStore,
            });
        }
    }, [b64, history, isAuthorized, params]);

    React.useEffect(() => {
        if (history.location.pathname.indexOf(applicationStore.url) != 1) {
            return;
        }
        if (!preference.redirectDebugWindow) {
            handleClick();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item>
                <Grid container className={classes.panel} spacing={1} direction="column" justify="center">
                    <Grid item>{trans("static:b35d5fa33cb14a1db46c4f684dc14037")}</Grid>
                    {params ? (
                        <React.Fragment>
                            <Grid item>{trans("static:6f93ca102d5f488aa3082e0344486e9e", {page: params.page})}</Grid>
                            <Grid item>
                                {trans("static:dda349a2de0049408168eb5d148442df", {
                                    filter: JSON.stringify(params.filter),
                                })}
                            </Grid>
                        </React.Fragment>
                    ) : (
                        <Grid item>{trans("static:86d945313cbd41beb5f5068c2696bcec")}</Grid>
                    )}
                    <Grid item>
                        {trans("static:6512d68884cd4848ba6129655dec51d4", {
                            status: isAuthorized
                                ? trans("static:0d9c5a0b816947a781f02baad2c2ce22")
                                : trans("static:e8281a11d60542c684f76ffab31216aa"),
                        })}
                    </Grid>
                    <Grid item className={classes.btnContainer}>
                        <Button
                            type="submit"
                            onClick={handleClick}
                            classes={{root: classes.button}}
                            disableRipple
                            disabled={!params}
                        >
                            {isAuthorized
                                ? trans("static:fad9bcdb1bf54640ab58d1781546c72c")
                                : trans("static:664bdebac78e47079bb685732899c5f6")}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
