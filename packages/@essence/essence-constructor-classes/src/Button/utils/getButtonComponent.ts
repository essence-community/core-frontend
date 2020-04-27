import {IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {IconButton} from "../components/IconButton";
import {Button} from "../components/Button";
import {IButtonInternalProps} from "../Button.types";

export function getButtonComponent(bc: IBuilderConfig, theme: IEssenceTheme): React.FC<IButtonInternalProps> {
    switch (true) {
        case bc.onlyicon === "true":
        case theme.palette.type === "dark" && (bc.uitype === "4" || bc.uitype === "11" || bc.uitype === "12"):
            return IconButton;
        default:
            return Button;
    }
}
