/* eslint-disable max-lines */
import {action, observable} from "mobx";
import {
    VALUE_SELF_ALWAYSFIRST,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_NAME,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {
    IBuilderConfig,
    IRecord,
    IStoreBaseModelProps,
    IBuilderMode,
    IHandlerOptions,
} from "@essence-community/constructor-share/types";
import {TabsStatusType, ITabStatusChange} from "./RoadMapModel.types";
import {getBtn} from "./RoadMapBtns";

export class RoadMapModel extends StoreBaseModel {
    @observable
    public tabValue: string;

    @observable
    public tabStatus: TabsStatusType = observable.map();

    public tabs: IBuilderConfig[];

    public childs: IBuilderConfig[];

    public recordStore: RecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const childs = (this.bc.childs || []).map((tab) => ({
            ...tab,
            type: "TABBUTTON",
        }));

        this.recordStore = new RecordsModel(
            {...this.bc, defaultvalue: VALUE_SELF_ALWAYSFIRST},
            {
                applicationStore: this.pageStore.applicationStore,
                pageStore: this.pageStore,
            },
        );
        this.childs = (this.bc.childs || []).map((tab) => ({
            ...tab,
            [VAR_RECORD_DISPLAYED]: undefined,
            editmodepanel: true,
            hideactions: true,
            topbtn: [],
        }));
        this.tabs = [...childs];
        this.tabValue = this.bc.childs && this.bc.childs.length ? this.bc.childs[0][VAR_RECORD_PAGE_OBJECT_ID] : "";
        this.initTabs();
        this.pageStore.updateGlobalValues({
            [`g_is_end_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isEnd(),
            [`g_is_start_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isStart(),
            [`g_panel_num_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]:
                this.tabValue && this.tabStatus.get(this.tabValue)?.num,
            [`g_panel_index_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabs
                .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
                .indexOf(this.tabValue),
        });
    }

    initTabs = () => {
        const namesTabBtn = [
            "Override Back Button",
            "Override Next Button",
            "Override Save Button",
            "Override Cancel Button",
        ];
        const btns = this.bc.topbtn || [];
        const childs = (this.bc.childs || []).map((tab) => ({...tab, type: "TABBUTTON"}));

        if (childs.length) {
            const [first] = childs;

            this.tabStatus.set(first[VAR_RECORD_PAGE_OBJECT_ID], {
                btns: getBtn(this.bc, [
                    ...btns,
                    ...(first.topbtn || []).filter((btn) => namesTabBtn.indexOf(btn[VAR_RECORD_NAME]!) !== -1),
                ]),
                disabled: false,
                hidden: true,
                index: 0,
                num: 1,
            });
            childs.splice(1).forEach((child, index) => {
                this.tabStatus.set(child[VAR_RECORD_PAGE_OBJECT_ID], {
                    btns: getBtn(this.bc, [
                        ...btns,
                        ...(child.topbtn || []).filter((btn) => namesTabBtn.indexOf(btn[VAR_RECORD_NAME]!) !== -1),
                    ]),
                    disabled: true,
                    hidden: true,
                    index: index + 1,
                    num: index + 2,
                });
            });
        }
    };

    changeTabAction = action("changeTabAction", (tabValue: string) => {
        this.tabValue = tabValue;
        this.pageStore.updateGlobalValues({
            [`g_is_end_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isEnd(),
            [`g_is_start_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isStart(),
            [`g_panel_num_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabStatus.get(this.tabValue)?.num,
            [`g_panel_index_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabs
                .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
                .indexOf(this.tabValue),
        });
    });

    isEnd = () => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject)?.hidden);
        const index = tabs.indexOf(this.tabValue);

        return index + 1 === tabs.length;
    };

    isStart = () => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject)?.hidden);
        const index = tabs.indexOf(this.tabValue);

        return index === 0;
    };

    @action
    setNextTab = async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        const form = this.pageStore.forms.get(this.tabValue)!;
        let isSuccess = true;

        if (btnBc.updatequery) {
            isSuccess = await this.checkFormAction(mode, btnBc, {...options, form});
        } else if (form && !btnBc.skipvalidation) {
            await form.validate();
            isSuccess = form.isValid;
        }

        if (isSuccess) {
            const tabs = this.tabs
                .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
                .filter((ckPageObject) => !this.tabStatus.get(ckPageObject)?.hidden);
            const index = tabs.indexOf(this.tabValue);
            const tab = tabs[index + 1];

            if (tab) {
                this.tabStatus.set(tab, {...this.tabStatus.get(tab)!, disabled: false});
                this.changeTabAction(tab);
            }
        }
    };

    @action
    setBackTab = () => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject)?.hidden);
        const index = tabs.indexOf(this.tabValue);
        const tab = tabs[index - 1];

        if (tab) {
            this.changeTabAction(tab);
        }
    };

    @action
    setFirstActiveTab = () => {
        const tab =
            this.tabs && this.tabs.find((child) => !this.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])!.hidden);

        if (tab) {
            this.changeTabAction(tab[VAR_RECORD_PAGE_OBJECT_ID]);
        }
    };

    @action
    setTabStatus = (tabValue: string, status: ITabStatusChange) => {
        const currentTabStatus = this.tabStatus.get(tabValue)!;
        const isCalcNum = status.hidden !== currentTabStatus.hidden;

        this.tabStatus.set(tabValue, {
            ...currentTabStatus,
            ...status,
        });
        const formTab = this.pageStore.forms.get(tabValue);

        if (formTab && !formTab.editing) {
            formTab.setEditing(true);
        }
        if (isCalcNum) {
            let index = 1;

            this.tabs.forEach((child) => {
                if (!this.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])?.hidden) {
                    this.tabStatus.set(child[VAR_RECORD_PAGE_OBJECT_ID], {
                        ...this.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])!,
                        num: index,
                    });
                    index += 1;
                }
            });
            this.pageStore.updateGlobalValues({
                [`g_is_end_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isEnd(),
                [`g_is_start_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isStart(),
                [`g_panel_num_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabStatus.get(this.tabValue)?.num,
                [`g_panel_index_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabs
                    .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
                    .indexOf(this.tabValue),
            });
        }
    };

    getActiveTabs = (): IBuilderConfig[] =>
        this.tabs.filter((tab): boolean => {
            const status = this.tabStatus.get(tab[VAR_RECORD_PAGE_OBJECT_ID]);

            return status ? !status.disabled && !status.hidden : true;
        });

    @action
    checkFormAction = async (mode: IBuilderMode, btnBc: IBuilderConfig, {form, files}: IHandlerOptions) => {
        await form!.validate();

        if (!btnBc.skipvalidation && form!.isValid) {
            return this.recordStore.saveAction(form!.values, (btnBc.modeaction || btnBc.mode || mode) as IBuilderMode, {
                actionBc: btnBc,
                files,
                form,
                query: btnBc.updatequery,
            });
        }

        return false;
    };

    @action
    saveAction = async (mode: IBuilderMode, btnBc: IBuilderConfig, {form, files}: IHandlerOptions) => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject)?.hidden);
        const isSuccess = await tabs
            .reduce(
                (val, ckPageObject) =>
                    val.then(async (res) => {
                        const tab = this.tabStatus.get(ckPageObject)!;
                        const formTab = this.pageStore.forms.get(ckPageObject);
                        const {btns} = tab;
                        const [bcBtn] = btns.filter((btn) => btn[VAR_RECORD_NAME] === "Override Next Button");

                        let result = res;

                        if (bcBtn.updatequery) {
                            result = await this.checkFormAction((bcBtn.mode || "1") as IBuilderMode, bcBtn, {
                                form: formTab,
                            });
                        } else if (formTab && !bcBtn.skipvalidation) {
                            await formTab.validate();
                            result = formTab.isValid;
                        }
                        if (!result) {
                            this.changeTabAction(ckPageObject);
                            throw result;
                        }

                        return result;
                    }),
                Promise.resolve(true),
            )
            .catch(() => false);

        if (isSuccess) {
            const values = this.tabs.map((bc) => {
                const {disabled, hidden, num} = this.tabStatus.get(bc[VAR_RECORD_PAGE_OBJECT_ID])!;
                const formTab = this.pageStore.forms.get(bc[VAR_RECORD_PAGE_OBJECT_ID]);

                return {
                    isPageDisabled: disabled,
                    isPageHidden: hidden,
                    numPage: num,
                    ...(formTab && formTab.values),
                } as IRecord;
            });

            this.recordStore.saveAction(values as any, (btnBc.modeaction || btnBc.mode || mode) as IBuilderMode, {
                actionBc: btnBc,
                files,
                form,
                query: btnBc.updatequery,
            });
        }
    };

    @action
    cancelAction = () => {
        this.setFirstActiveTab();
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject)?.hidden);
        const firstFormTab = this.pageStore.forms.get(this.tabValue);

        if (firstFormTab) {
            firstFormTab.reset();
        }
        tabs.splice(1).forEach((tab) => {
            const tabObj = this.tabStatus.get(tab)!;
            const formTab = this.pageStore.forms.get(tab);

            if (formTab) {
                formTab.reset();
            }
            this.tabStatus.set(tab, {
                ...tabObj,
                disabled: true,
            });
        });
    };

    handlers = {
        onBackTab: () => {
            this.setBackTab();

            return Promise.resolve(true);
        },
        onNextTab: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            await this.setNextTab(mode, btnBc, options);

            return Promise.resolve(true);
        },
        onSimpleCancel: () => {
            this.cancelAction();

            return Promise.resolve(true);
        },
        onSimpleSave: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            await this.saveAction(mode, btnBc, options);

            return Promise.resolve(true);
        },
    };
}
