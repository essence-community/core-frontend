// @flow
import {extendObservable, action, observable} from "mobx";
import {
    VALUE_SELF_ALWAYSFIRST,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import isBoolean from "lodash/isBoolean";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {checkAutoload} from "../../utils/builder";
import {type BuilderTabType, type TabsStatusType, type RoadMapModelType, type TabStatusChangeType} from "./RoadMapType";

import {getBtn} from "./RoadMapBtnConfigs";

export class RoadMapModel extends StoreBaseModel implements RoadMapModelType {
    tabValue: string;

    tabBc: BuilderTabType;

    tabStatus: TabsStatusType;

    tabs: Array<BuilderBaseType>;

    childs: Array<BuilderBaseType>;

    recordStore: RecordsModelType;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        const childs = (this.bc.childs || []).map((tab) => ({...tab, type: "TABBUTTON"}));

        this.recordStore = new RecordsModel({...this.bc, defaultvalue: VALUE_SELF_ALWAYSFIRST}, this.pageStore);
        this.childs = (this.bc.childs || []).map((tab) => ({...tab, editmodepanel: "false", topbtn: []}));
        this.tabBc = this.bc;
        this.tabs = [...childs];
        extendObservable(this, {
            tabStatus: observable.map(),
            tabValue: this.bc.childs && this.bc.childs.length ? this.bc.childs[0][VAR_RECORD_PAGE_OBJECT_ID] : "",
        });
        this.initTabs();
        this.pageStore.updateGlobalValues({
            [`g_is_end_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isEnd(),
            [`g_is_start_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isStart(),
            [`g_panel_num_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]:
                this.tabValue && this.tabStatus.get(this.tabValue).num,
            [`g_panel_index_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabs
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
                btns: getBtn(this.tabBc, [
                    ...btns,
                    ...(first.topbtn || []).filter((btn) => namesTabBtn.indexOf(btn[VAR_RECORD_NAME]) !== -1),
                ]),
                disabled: false,
                hidden: false,
                index: 0,
                num: 1,
                recordStore: new RecordsModel({...this.tabs[0], defaultvalue: VALUE_SELF_ALWAYSFIRST}, this.pageStore),
            });
            childs.splice(1).forEach((child, index) => {
                this.tabStatus.set(child[VAR_RECORD_PAGE_OBJECT_ID], {
                    btns: getBtn(this.tabBc, [
                        ...btns,
                        ...(child.topbtn || []).filter((btn) => namesTabBtn.indexOf(btn[VAR_RECORD_NAME]) !== -1),
                    ]),
                    disabled: true,
                    hidden: false,
                    index: index + 1,
                    num: index + 2,
                    recordStore: new RecordsModel({...child, defaultvalue: VALUE_SELF_ALWAYSFIRST}, this.pageStore),
                });
            });
        }
    };

    changeTabAction = action("changeTabAction", (tabValue: string) => {
        this.tabValue = tabValue;
        this.pageStore.updateGlobalValues({
            [`g_is_end_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isEnd(),
            [`g_is_start_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.isStart(),
            [`g_panel_num_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabStatus.get(this.tabValue).num,
            [`g_panel_index_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabs
                .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
                .indexOf(this.tabValue),
        });
    });

    isEnd = () => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const index = tabs.indexOf(this.tabValue);

        return index + 1 === tabs.length;
    };

    isStart = () => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const index = tabs.indexOf(this.tabValue);

        return index === 0;
    };

    setNextTab = action("setNextTab", async (mode, bcBtn, obj) => {
        const {form} = this.tabStatus.get(this.tabValue);
        const isSuccess = bcBtn.updatequery ? await this.checkForm(mode, bcBtn, {...obj, form}) : form && form.isValid;

        if (isSuccess) {
            const tabs = this.tabs
                .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
                .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
            const index = tabs.indexOf(this.tabValue);
            const tab = tabs[index + 1];

            if (tab) {
                this.tabStatus.set(tab, {...this.tabStatus.get(tab), disabled: false});
                this.changeTabAction(tab);
            }
        }
    });

    setBackTab = action("setBackTab", () => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const index = tabs.indexOf(this.tabValue);
        const tab = tabs[index - 1];

        if (tab) {
            this.changeTabAction(tab);
        }
    });

    setFirstActiveTab = action("setFirstActiveTab", () => {
        const tab =
            this.tabs && this.tabs.find((child) => !this.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID]).hidden);

        if (tab) {
            this.changeTabAction(tab[VAR_RECORD_PAGE_OBJECT_ID]);
        }
    });

    setTabStatus = action("setTabStatus", (tabValue: string, status: TabStatusChangeType) => {
        const currentTabStatus = this.tabStatus.get(tabValue);
        const isCalcNum = isBoolean(status.hidden) && status.hidden !== currentTabStatus.hidden;

        this.tabStatus.set(tabValue, {
            ...currentTabStatus,
            ...status,
        });
        if (isCalcNum) {
            let index = 1;

            this.tabs.forEach((child) => {
                if (!this.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID]).hidden) {
                    this.tabStatus.set(child[VAR_RECORD_PAGE_OBJECT_ID], {
                        ...this.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID]),
                        num: index,
                    });
                    index += 1;
                }
            });
            this.pageStore.updateGlobalValues({
                [`g_panel_num_${this.tabBc[VAR_RECORD_PAGE_OBJECT_ID]}`]: this.tabStatus.get(this.tabValue).num,
            });
        }
    });

    getActiveTabs = (): Array<Object> =>
        this.tabs.filter((tab): boolean => {
            const status = this.tabStatus.get(tab[VAR_RECORD_PAGE_OBJECT_ID]);

            return status ? !status.disabled && !status.hidden : true;
        });

    checkForm = async (mode: BuilderModeType, btnBc: BuilderBaseType, {form, files}: any) => {
        await form.validate({showErrors: true});

        if (form.isValid) {
            return this.recordStore.saveAction(form.values, btnBc.modeaction || btnBc.mode || mode, {
                actionBc: btnBc,
                files,
                form,
                query: btnBc.updatequery,
            });
        }

        return false;
    };

    onSimpleSave = async (mode: BuilderModeType, btnBc: BuilderBaseType, {form, files}: any) => {
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const isSuccess = await tabs
            .reduce(
                (val, ckPageObject) =>
                    val.then(async () => {
                        const tab = this.tabStatus.get(ckPageObject);
                        const {form: formTab, btns} = tab;
                        const [bcBtn] = btns.filter((btn) => btn[VAR_RECORD_NAME] === "Override Next Button");

                        const result = bcBtn.updatequery
                            ? await this.checkForm(bcBtn.mode || "1", bcBtn, {form: formTab})
                            : formTab && formTab.isValid;

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
                const {disabled, hidden, num, form: formTab} = this.tabStatus.get(bc[VAR_RECORD_PAGE_OBJECT_ID]);

                return {
                    isPageDisabled: disabled,
                    isPageHidden: hidden,
                    numPage: num,
                    ...(formTab && formTab.values()),
                };
            });

            this.recordStore.saveAction(values, btnBc.modeaction || btnBc.mode || mode, {
                actionBc: btnBc,
                files,
                form,
                query: btnBc.updatequery,
            });
        }
    };

    onSimpleCancel = () => this.cancelAction();

    cancelAction = action("cancelAction", () => {
        this.setFirstActiveTab();
        const tabs = this.tabs
            .map((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID])
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const first = this.tabStatus.get(this.tabValue);

        if (first.form) {
            first.form.reset();
        }
        tabs.splice(1).forEach((tab) => {
            const tabObj = this.tabStatus.get(tab);

            if (tabObj.form) {
                tabObj.form.reset();
            }
            this.tabStatus.set(tab, {
                ...tabObj,
                disabled: true,
            });
        });
    });

    postMountAction = action("postMountAction", () => {
        this.tabs.forEach((bc) => {
            const tabObj = this.tabStatus.get(bc[VAR_RECORD_PAGE_OBJECT_ID]);

            if (
                !tabObj.hidden &&
                checkAutoload({bc, pageStore: this.pageStore, recordsStore: tabObj.recordStore}) &&
                !tabObj.recordStore.isLoading
            ) {
                tabObj.recordStore.loadRecordsAction();
            }
        });
    });
}
