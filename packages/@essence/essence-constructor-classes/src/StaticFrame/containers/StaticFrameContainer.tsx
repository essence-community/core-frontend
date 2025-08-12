import React, {memo} from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_CV_TOKEN} from "@essence-community/constructor-share/constants";
import {useHistory, useParams} from "react-router-dom";
import {redirectAuth} from "@essence-community/constructor-share/utils/redirect";

interface IUrlParams {
    app: string;
    pageId: string;
    filter?: string;
    token?: string;
    session?: string;
}

export const StaticFrameContainer: React.FC<IClassProps> = memo(() => {
    const applicationStore = React.useContext(ApplicationContext);
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const {session, token = "", app, pageId, filter} = useParams<IUrlParams>();

    React.useEffect(() => {
        const backUrl = `/${app}/${pageId}${filter ? `/${filter}` : ""}`;
        const state = (history.location.state || {}) as {backUrl?: string};

        if (
            history.location.pathname === backUrl ||
            history.location.pathname.indexOf(applicationStore.url) != 1 ||
            state.backUrl === backUrl ||
            isLoading
        ) {
            return;
        }
        history.replace(history.location.pathname, {backUrl});

        const loginByToken = async () => {
            setIsLoading(true);
            await applicationStore?.authStore.loginAction({
                authValues: {
                    [VAR_RECORD_CV_TOKEN]: token,
                },
                history,
            });

            // If not logger change bach url to page instead of return to back frame page
            if (!applicationStore?.authStore.userInfo.session) {
                redirectAuth({
                    backUrl,
                    history,
                    pageStore: applicationStore.pageStore,
                });
            }
            setIsLoading(false);
        };
        const loginBySesstion = async () => {
            setIsLoading(true);
            await applicationStore?.authStore.checkAuthAction(history, session);
            // If not session go to auth page
            if (!applicationStore?.authStore.userInfo.session) {
                redirectAuth({
                    backUrl,
                    history,
                    pageStore: applicationStore.pageStore,
                });
            }
            setIsLoading(false);
        };

        if (session) {
            loginBySesstion();
        } else if (token) {
            loginByToken();
        } else {
            if (!applicationStore?.authStore.userInfo.session) {
                redirectAuth({
                    backUrl,
                    history,
                    pageStore: applicationStore.pageStore,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
});
