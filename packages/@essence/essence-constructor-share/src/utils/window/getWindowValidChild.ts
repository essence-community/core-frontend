import {IBuilderConfig, IPageModel, IRecord} from "../../types";
import {parse} from "../parser";

export function getWindowValidChild(
    editors: IBuilderConfig[],
    pageStore: IPageModel,
    values?: IRecord,
): IBuilderConfig {
    const getValue = (name: string) => (values && values[name] ? values[name] : pageStore.globalValues.get(name));

    const findEditor = editors.find((editor: IBuilderConfig) => {
        return !editor.activerules || parse(editor.activerules).runer({get: getValue});
    });

    // If not found fallback to first editor
    return findEditor || editors[0];
}
