import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {
    IStoreBaseModelProps,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
    IRecord,
    IFormOptions,
} from "@essence-community/constructor-share/types";
import {History} from "history";

interface IAuthFormModelProps extends IStoreBaseModelProps {
    history: History;
}

export class AuthFormModel extends StoreBaseModel {
    private history: History;

    constructor(props: IAuthFormModelProps) {
        super(props);

        this.history = props.history;
    }

    handleSubmit = async (values: IRecord, {form}: IFormOptions) => {
        const authStore = this.applicationStore && this.applicationStore.authStore;

        if (form) {
            await form.validate();

            if (form.isValid && authStore) {
                authStore.loginAction(form.values as Record<string, string>, this.history);

                return;
            }
        }

        return;
    };

    handlers = {
        onLogin: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;
            const authStore = this.applicationStore && this.applicationStore.authStore;

            if (form) {
                await form.validate();

                if ((btnBc.skipvalidation || form.isValid) && authStore) {
                    authStore.loginAction(form.values as Record<string, string>, this.history);

                    return true;
                }
            }

            return false;
        },
        onLoginGuest: () => {
            const authStore = this.applicationStore && this.applicationStore.authStore;

            if (authStore) {
                authStore.checkAuthAction(this.history, authStore.userInfo.session, "true");
            }

            return Promise.resolve(true);
        },
    };
}
