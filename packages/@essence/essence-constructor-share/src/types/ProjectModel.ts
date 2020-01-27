export interface IKeyboardState {
    lastKeyCode?: number;
    keyCodes: number[];
}

export interface IProjectModel {
    keyboardState: IKeyboardState;
    setKeyboardState(keyboardState: IKeyboardState): void;
}
