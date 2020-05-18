import {IBuilderMode} from "@essence-community/constructor-share/types";

/**
 * Get title for mode
 */
export function getModeTitle(mode: IBuilderMode): string {
    switch (mode) {
        case "1":
            return "static:aa75a46ca0a44a6a8a16ffa1357ec313";
        case "6":
            return "static:7437988e948f4962abba9656e4988adc";
        default:
            return "static:8059806cc90c4ba4be7fa5ae15d5e64b";
    }
}
