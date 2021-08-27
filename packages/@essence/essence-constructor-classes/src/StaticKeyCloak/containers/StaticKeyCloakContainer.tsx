import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_QUERY_ID} from "@essence-community/constructor-share/constants";
import {useHistory} from "react-router-dom";
import {parse, stringify} from "qs";
import {removeFromLocalStore, getFromLocalStore} from "@essence-community/constructor-share/utils/storage";

const VAR_RECORD_KEYCLOAK = "jl_keycloak_auth_callback";
const VAR_RECORD_KEYCLOAK_PARAM = "jt_keycloak";

export const StaticKeyCloakContainer: React.FC<IClassProps> = ({bc}) => {
    const applicationStore = React.useContext(ApplicationContext);
    const history = useHistory();

    React.useEffect(() => {
        const params =
            history.location.search && history.location.search.slice(1) ? parse(history.location.search.slice(1)) : {};
        const loginByKeyClock = async () => {
            const backUrl = getFromLocalStore("errorMoveResponse");

            if (backUrl) {
                history.replace(history.location.pathname, {backUrl});
                removeFromLocalStore("errorMoveResponse");
            }

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
    }, [applicationStore?.authStore, bc, history, history.location.search]);

    return null;
};
