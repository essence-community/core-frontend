export interface IModuleClass {
    cv_type: string;
}

export interface IModuleClassAttribute {
    ck_attr: string;
}

export interface IModuleConfig {
    class: IModuleClass;
    class_attributes: IModuleClassAttribute[];
}
