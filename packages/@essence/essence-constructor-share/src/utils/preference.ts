import {getFromStore, saveToStore} from "./storage";

export interface IPreference {
    debounceTooltipTime: number;
    delayTooltipShow: number;
    experimentalUI: boolean;
    modules: string;
    offsetTooltip: number;
    redirectDebugWindow: boolean;
    wysiwygCombineFields: boolean;
}

const PREFERENCE_KEY = "preference";

const defaultPreference: IPreference = {
    // Задержка скрытия Tooltip
    debounceTooltipTime: 12,
    // Время появления Tooltip после наведения
    delayTooltipShow: 300,
    // Enable experimental UI
    experimentalUI: false,
    // Список модулей через запятую
    modules: "",
    // Смещение Tooltip по даигонали от курсора мышки
    offsetTooltip: 15,
    // Включение отладочного окна при передае параметров извне
    redirectDebugWindow: false,
    // Включение режима объединения полей в wysiwyg
    wysiwygCombineFields: false,
};

let loadedPreference: undefined | IPreference = undefined;

export function getPreference(): IPreference {
    if (!loadedPreference) {
        loadedPreference = {
            ...defaultPreference,
            ...getFromStore<IPreference>(PREFERENCE_KEY),
        };
    }

    return loadedPreference;
}

export function savePreference(preference: IPreference) {
    loadedPreference = preference;
    saveToStore(PREFERENCE_KEY, preference);
}
