import * as React from "react";
import {IClassProps, IPageModel} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_QUERY_ID, VAR_SETTING_AUTH_URL} from "@essence-community/constructor-share/constants";
import {useHistory} from "react-router-dom";
import {parse, stringify} from "qs";
import {History} from "history";
import {removeFromLocalStore, getFromLocalStore} from "@essence-community/constructor-share/utils/storage";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {choiceUrl, prepareUrl} from "@essence-community/constructor-share/utils/redirect";

const VAR_RECORD_KEYCLOAK = "jl_keycloak_auth_callback";
const VAR_RECORD_KEYCLOAK_PARAM = "jt_keycloak";

function getAuthUrl(history: History, pageStore: IPageModel, backUrl: string): URL {
    let url = settingsStore.settings[VAR_SETTING_AUTH_URL] || "/auth";
    const params =
        history.location.search && history.location.search.slice(1) ? parse(history.location.search.slice(1)) : {};

    if (url.startsWith("/") || url.startsWith("http") || url.startsWith("{")) {
        url = prepareUrl(url, pageStore, {
            ...params,
            backUrl,
        });
    } else {
        url =
            choiceUrl(url, pageStore.globalValues, {
                ...params,
                backUrl,
            }) || "/auth";
    }

    return new URL(url);
}

export const StaticKeyCloakContainer: React.FC<IClassProps> = ({bc}) => {
    const applicationStore = React.useContext(ApplicationContext);
    const history = useHistory();

    React.useEffect(() => {
        const params =
            history.location.search && history.location.search.slice(1) ? parse(history.location.search.slice(1)) : {};
        const loginByKeyClock = async () => {
            const backUrl = getFromLocalStore<string>("errorMoveResponse");

            if (backUrl) {
                history.replace(history.location.pathname, {backUrl});
                removeFromLocalStore("errorMoveResponse");
            }

            const authUrl = getAuthUrl(history, applicationStore.pageStore, backUrl);

            params.redirect_uri = authUrl.searchParams.get("redirect_uri");

            await applicationStore?.authStore.loginAction({
                authValues: {
                    [VAR_RECORD_KEYCLOAK]: "1",
                    [bc.column || VAR_RECORD_KEYCLOAK_PARAM]: JSON.stringify({
                        query: stringify(params),
                    }),
                },
                history,
                query: bc[VAR_RECORD_QUERY_ID] || "Login",
            });
        };

        if (params[bc.defaultvalue || VAR_RECORD_KEYCLOAK] === "1") {
            loginByKeyClock();
        }
    }, [applicationStore?.authStore, applicationStore?.pageStore, bc, history, history.location.search]);

    return null;
};
