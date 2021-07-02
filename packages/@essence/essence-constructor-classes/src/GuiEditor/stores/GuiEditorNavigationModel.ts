import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {IBuilderConfig, IBuilderMode, IHandlers} from "@essence-community/constructor-share/types";
import {observable} from "mobx";

export class GuiEditorNavigationModel extends StoreBaseModel {
    @observable
    selectedMenu: IBuilderConfig | undefined = undefined;

    handleCloseMenu = (): void => {
        this.selectedMenu = undefined;
    };

    handleSelectMenu = (objectId: string): void => {
        const child = this.bc.childs.find((child) => child[VAR_RECORD_PAGE_OBJECT_ID] === objectId);

        this.selectedMenu = child;
    };

    handlers: IHandlers = {
        onCloseMenu: (): Promise<boolean> => {
            this.handleCloseMenu();

            return Promise.resolve(true);
        },
        onSelectMenu: (mode: IBuilderMode, btnBc: IBuilderConfig): Promise<boolean> => {
            this.handleSelectMenu(btnBc[VAR_RECORD_PAGE_OBJECT_ID].replace("_BTN", ""));

            return Promise.resolve(true);
        },
    };
}
