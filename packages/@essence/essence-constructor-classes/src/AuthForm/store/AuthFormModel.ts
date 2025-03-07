import {IForm} from "@essence-community/constructor-share/Form/types";
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
import { makeObservable } from "mobx";

interface IAuthFormModelProps extends IStoreBaseModelProps {
    history: History;
}

export class AuthFormModel extends StoreBaseModel {
    private history: History;

    constructor(props: IAuthFormModelProps) {
        super(props);

        this.history = props.history;
        makeObservable(this);
    }

    handleLogin = async (form?: IForm, skipValidation?: boolean, query = "Login") => {
        if (form) {
            const authStore = this.applicationStore && this.applicationStore.authStore;

            await form.validate();

            if ((skipValidation || form.isValid) && authStore) {
                authStore.loginAction({
                    authValues: form.values as Record<string, string>,
                    history: this.history,
                    query,
                });

                return true;
            }
        }

        return false;
    };

    handleSubmit = async (values: IRecord, {form}: IFormOptions) => {
        await this.handleLogin(form);
    };

    handlers = {
        onLogin: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;

            return this.handleLogin(form, btnBc.skipvalidation, btnBc.updatequery);
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
