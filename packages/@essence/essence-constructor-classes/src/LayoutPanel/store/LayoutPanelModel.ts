/* eslint-disable sort-keys */
import {action, computed, observable, ObservableMap} from "mobx";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {IStoreBaseModelProps, IStoreBaseModel} from "@essence-community/constructor-share/types";
import {Layout} from "react-grid-layout";
import {saveToStore, getFromStore} from "@essence-community/constructor-share/utils/storage";
import {IChildBuilderConfig, ILayout} from "../types";

export class LayoutPanelModel extends StoreBaseModel implements IStoreBaseModel {
    @observable
    public allLayout: Layout[] = observable.array();

    @observable
    public hiddenLayout: ObservableMap<string, Layout> = observable.map();

    @observable
    public collapsedLayout: ObservableMap<string, Partial<ILayout>> = observable.map();

    @observable
    public activeFullScreen?: Layout;

    @observable
    public activeWidget?: string;

    @observable
    public label: ObservableMap<string, string> = observable.map();

    @observable
    childs: IChildBuilderConfig[];

    @computed public get layout() {
        return this.allLayout.map((val) => {
            if (this.hiddenLayout.has(val.i) && !(val.h === 0 && val.w === 0 && val.x === 0 && val.y === 0)) {
                return {
                    ...val,
                    h: 0,
                    w: 0,
                    x: 0,
                    y: 0,
                    isResizable: false,
                    isDraggable: false,
                };
            }

            if (this.activeFullScreen && this.activeFullScreen.i === val.i && val.h !== Number.MAX_SAFE_INTEGER) {
                return {
                    ...val,
                    x: 0,
                    y: 0,
                    w: (this.bc as any).layoutpanelconfig?.cols || 12,
                    h: Number.MAX_SAFE_INTEGER,
                    isResizable: false,
                    isDraggable: false,
                };
            }

            return val;
        });
    }

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.bc.childs?.forEach((child) => {
            this.label.set(child[VAR_RECORD_PAGE_OBJECT_ID], child[VAR_RECORD_DISPLAYED]);
        });
        this.childs = this.bc.childs?.map((child) => ({...child, [VAR_RECORD_DISPLAYED]: undefined}));
        this.allLayout =
            this.childs?.map(
                (childBc) =>
                    ({
                        ...(childBc.layoutcomponentconfig || {}),
                        ...(childBc.layoutcomponentconfig?.extra
                            ? JSON.parse(childBc.layoutcomponentconfig.extra)
                            : {}),
                        i: childBc[VAR_RECORD_PAGE_OBJECT_ID],
                    } as any),
            ) || [];
        if (this.bc.isstate) {
            this.loadState();
        }
    }

    @action
    loadState() {
        const state = getFromStore<any>(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (!state) {
            return;
        }
        let oldChildren = state.childs as string[];

        oldChildren = oldChildren.sort();
        let curChilds = this.childs.map((child) => child[VAR_RECORD_PAGE_OBJECT_ID]);

        curChilds = curChilds.sort();
        if (JSON.stringify(oldChildren) === JSON.stringify(curChilds)) {
            this.allLayout = observable.array(state.allLayout);
            this.hiddenLayout = observable.map(state.hiddenLayout);
            this.collapsedLayout = observable.map(state.collapsedLayout);
            this.activeFullScreen = state.activeFullScreen;
            this.activeWidget = state.activeWidget;
        }
    }

    @action
    public setHiddenComponent(key: string, hidden: boolean) {
        if (hidden) {
            this.hiddenLayout.set(
                key,
                this.allLayout.find((val) => val.i === key),
            );
        } else if (this.hiddenLayout.has(key)) {
            this.allLayout = observable.array(
                this.allLayout.map((val) => {
                    if (val.i === key) {
                        const val = this.hiddenLayout.get(key);

                        this.hiddenLayout.delete(key);

                        return {
                            ...val,
                        };
                    }

                    return val;
                }),
            );
        }
    }

    @action
    public setLayout(allLayout: Layout[]) {
        this.allLayout = observable.array(allLayout);
    }

    @action
    public handleFullScreen(key: string) {
        if (this.activeFullScreen && this.activeFullScreen.i === key) {
            this.allLayout = observable.array(
                this.allLayout.map((val) => {
                    if (val.i === key) {
                        return {
                            ...val,
                            ...(this.activeFullScreen || {}),
                        };
                    }

                    return val;
                }),
            );
            this.activeFullScreen = null;
        } else {
            this.activeFullScreen = this.allLayout.find((val) => val.i === key);
        }
    }

    @action
    public handleActive(key: string) {
        this.activeWidget = key;
    }
    @action
    public handleCollapse(key: string) {
        if (this.collapsedLayout.has(key)) {
            this.allLayout = observable.array(
                this.allLayout.map((val) => {
                    if (val.i === key) {
                        const old = this.collapsedLayout.get(key);

                        this.collapsedLayout.delete(key);

                        return {
                            ...val,
                            h: old.h,
                            isResizable: old.isResizable,
                        };
                    }

                    return val;
                }),
            );
        } else {
            this.allLayout = observable.array(
                this.allLayout.map((val) => {
                    if (val.i === key) {
                        this.collapsedLayout.set(key, {
                            ...val,
                        });

                        return {
                            ...val,
                            h: 1,
                            isResizable: false,
                        };
                    }

                    return val;
                }),
            );
        }
    }

    setState(state: any) {
        saveToStore(this.bc[VAR_RECORD_PAGE_OBJECT_ID], state);
    }
}
