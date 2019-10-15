/* eslint-disable @typescript-eslint/interface-name-prefix */
declare module "mobx-react-form" {
    interface IValidateOptions {
        showErrors: boolean;
    }

    declare interface Form {
        validate(options: IValidateOptions): Promise<boolean>;
        isValid: boolean;
        values(): Record<string, string | number>;
    }

    declare interface Field {}
}
