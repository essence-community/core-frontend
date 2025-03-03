import {makeObservable, observable} from "mobx";
import {IProjectModel, IKeyboardState} from "../../types";

export class ProjectModel implements IProjectModel {
    constructor() {
        makeObservable(this);
    }
    @observable keyboardState: IKeyboardState = {
        keyCodes: [],
    };

    setKeyboardState = (keyboardState: IKeyboardState) => {
        this.keyboardState = keyboardState;
    };
}
