// @flow
import {extendObservable, action, observable} from "mobx";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils/transform";
import isBoolean from "lodash/isBoolean";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
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

        this.recordStore = new RecordsModel({...this.bc, defaultvalue: "alwaysfirst"}, this.pageStore);
        this.childs = (this.bc.childs || []).map((tab) => ({...tab, editmodepanel: "false", topbtn: []}));
        this.tabBc = this.bc;
        this.tabs = [...childs];
        extendObservable(this, {
            tabStatus: observable.map(),
            tabValue: this.bc.childs && this.bc.childs.length ? this.bc.childs[0].ckPageObject : "",
        });
        this.initTabs();
        this.pageStore.updateGlobalValues(
            camelCaseKeys({
                [`gIsEnd_${this.tabBc.ckPageObject}`]: this.isEnd(),
                [`gIsStart_${this.tabBc.ckPageObject}`]: this.isStart(),
                [`gPageNum_${this.tabBc.ckPageObject}`]: this.tabStatus.get(this.tabValue).num,
                [`gPageIndex_${this.tabBc.ckPageObject}`]: this.tabs
                    .map((tab) => tab.ckPageObject)
                    .indexOf(this.tabValue),
            }),
        );
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

            this.tabStatus.set(first.ckPageObject, {
                btns: getBtn(this.tabBc, [
                    ...btns,
                    ...(first.topbtn || []).filter((btn) => namesTabBtn.indexOf(btn.cvName) !== -1),
                ]),
                disabled: false,
                hidden: false,
                index: 0,
                num: 1,
                recordStore: new RecordsModel({...this.tabs[0], defaultvalue: "alwaysfirst"}, this.pageStore),
            });
            childs.splice(1).forEach((child, index) => {
                this.tabStatus.set(child.ckPageObject, {
                    btns: getBtn(this.tabBc, [
                        ...btns,
                        ...(child.topbtn || []).filter((btn) => namesTabBtn.indexOf(btn.cvName) !== -1),
                    ]),
                    disabled: true,
                    hidden: false,
                    index: index + 1,
                    num: index + 2,
                    recordStore: new RecordsModel({...child, defaultvalue: "alwaysfirst"}, this.pageStore),
                });
            });
        }
    };

    changeTabAction = action("changeTabAction", (tabValue: string) => {
        this.tabValue = tabValue;
        this.pageStore.updateGlobalValues(
            camelCaseKeys({
                [`gIsEnd_${this.tabBc.ckPageObject}`]: this.isEnd(),
                [`gIsStart_${this.tabBc.ckPageObject}`]: this.isStart(),
                [`gPageNum_${this.tabBc.ckPageObject}`]: this.tabStatus.get(this.tabValue).num,
                [`gPageIndex_${this.tabBc.ckPageObject}`]: this.tabs
                    .map((tab) => tab.ckPageObject)
                    .indexOf(this.tabValue),
            }),
        );
    });

    isEnd = () => {
        const tabs = this.tabs
            .map((tab) => tab.ckPageObject)
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const index = tabs.indexOf(this.tabValue);

        return index + 1 === tabs.length;
    };

    isStart = () => {
        const tabs = this.tabs
            .map((tab) => tab.ckPageObject)
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const index = tabs.indexOf(this.tabValue);

        return index === 0;
    };

    setNextTab = action("setNextTab", async (mode, bcBtn, obj) => {
        const {form} = this.tabStatus.get(this.tabValue);
        const isSuccess = bcBtn.updatequery ? await this.checkForm(mode, bcBtn, {...obj, form}) : form && form.isValid;

        if (isSuccess) {
            const tabs = this.tabs
                .map((tab) => tab.ckPageObject)
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
            .map((tab) => tab.ckPageObject)
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const index = tabs.indexOf(this.tabValue);
        const tab = tabs[index - 1];

        if (tab) {
            this.changeTabAction(tab);
        }
    });

    setFirstActiveTab = action("setFirstActiveTab", () => {
        const tab = this.tabs && this.tabs.find((child) => !this.tabStatus.get(child.ckPageObject).hidden);

        if (tab) {
            this.changeTabAction(tab.ckPageObject);
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
                if (!this.tabStatus.get(child.ckPageObject).hidden) {
                    this.tabStatus.set(child.ckPageObject, {
                        ...this.tabStatus.get(child.ckPageObject),
                        num: index,
                    });
                    index += 1;
                }
            });
            this.pageStore.updateGlobalValues(
                camelCaseKeys({
                    [`gPageNum_${this.tabBc.ckPageObject}`]: this.tabStatus.get(this.tabValue).num,
                }),
            );
        }
    });

    getActiveTabs = (): Array<Object> =>
        this.tabs.filter(
            (tab): boolean => {
                const status = this.tabStatus.get(tab.ckPageObject);

                return status ? !status.disabled && !status.hidden : true;
            },
        );

    checkForm = async (mode: BuilderModeType, btnBc: BuilderBaseType, {form, files}: any) => {
        await form.validate({showErrors: true});

        if (form.isValid) {
            return this.recordStore.saveAction(form.values(), btnBc.modeaction || btnBc.mode || mode, {
                actionBc: btnBc,
                files,
                query: btnBc.updatequery,
            });
        }

        return false;
    };

    onSimpleSave = async (mode: BuilderModeType, btnBc: BuilderBaseType, {files}: any) => {
        const tabs = this.tabs
            .map((tab) => tab.ckPageObject)
            .filter((ckPageObject) => !this.tabStatus.get(ckPageObject).hidden);
        const isSuccess = await tabs
            .reduce(
                (val, ckPageObject) =>
                    val.then(async () => {
                        const tab = this.tabStatus.get(ckPageObject);
                        const {form, btns} = tab;
                        const [bcBtn] = btns.filter((btn) => btn.cvName === "Override Next Button");

                        const result = bcBtn.updatequery
                            ? await this.checkForm(bcBtn.mode || "1", bcBtn, {form})
                            : form && form.isValid;

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
                const {disabled, hidden, num, form} = this.tabStatus.get(bc.ckPageObject);

                return {
                    isPageDisabled: disabled,
                    isPageHidden: hidden,
                    numPage: num,
                    ...(form && form.values()),
                };
            });

            this.recordStore.saveAction(values, btnBc.modeaction || btnBc.mode || mode, {
                actionBc: btnBc,
                files,
                query: btnBc.updatequery,
            });
        }
    };

    onSimpleCancel = () => this.cancelAction();

    cancelAction = action("cancelAction", () => {
        this.setFirstActiveTab();
        const tabs = this.tabs
            .map((tab) => tab.ckPageObject)
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
}
