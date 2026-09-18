import {observable} from "mobx";
import {IProjectModel, IKeyboardState} from "../../types";

export class ProjectModel implements IProjectModel {
    constructor() {
    }
    @observable accessor keyboardState: IKeyboardState = {
        keyCodes: [],
    };

    setKeyboardState = (keyboardState: IKeyboardState) => {
        this.keyboardState = keyboardState;
    };
}
