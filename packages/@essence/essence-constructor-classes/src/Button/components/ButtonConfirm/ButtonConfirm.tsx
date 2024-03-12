import * as React from "react";
import {IBuilderConfig, IPageModel, IEssenceTheme} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Popover, Confirm} from "@essence-community/constructor-share/uicomponents";
import {IPopoverProps} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {useTheme} from "@material-ui/core";
import {IPopoverContext} from "@essence-community/constructor-share/context";
import {useTranslation} from "@essence-community/constructor-share/utils/I18n";
import {ButtonConfirmEsc} from "../ButtonConfirmEsc";
import {getButtonComponent} from "../../utils/getButtonComponent";

const popoverProps: Record<"right" | "top", Partial<IPopoverProps>> = {
    right: {
        anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
        },
        focusableMount: true,
        hideBackdrop: false,
        restoreFocusedElement: true,
        transformOrigin: {
            horizontal: -14,
            vertical: "center",
        },
    },
    top: {
        anchorOrigin: {
            horizontal: "center",
            vertical: "top",
        },
        focusableMount: true,
        hideBackdrop: false,
        restoreFocusedElement: true,
        transformOrigin: {
            horizontal: "center",
            vertical: "bottom",
        },
    },
};

interface IButtonConfirmProps {
    bc: IBuilderConfig;
    disabled?: boolean;
    pageStore: IPageModel;
    popoverCtx: IPopoverContext;
    onClick: () => Promise<void | boolean>;
}

export const ButtonConfirm: React.FC<IButtonConfirmProps> = React.memo(function ButtonConfirmMemo(props) {
    const {pageStore, bc, disabled, onClick, popoverCtx} = props;
    const {mode, confirmquestion, confirmquestionposition = "right"} = bc;
    const theme = useTheme<IEssenceTheme>();
    const [trans] = useTranslation("meta");
    const confirmQuestion = trans(confirmquestion, confirmquestion);
    const Component = getButtonComponent(bc, theme);

    if (typeof confirmquestion === "string" ? confirmQuestion !== "false" : mode === "4" || mode === "7") {
        return (
            <Popover
                width={250}
                popoverContent={({onClose}) => (
                    <Confirm
                        pageStore={pageStore}
                        ckPageObject={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-confirm`}
                        onAccept={async (event: React.SyntheticEvent) => {
                            event.stopPropagation();

                            const result = await onClick();

                            if (result) {
                                onClose(event);
                            }
                        }}
                        onDecline={onClose}
                    >
                        {bc.confirmquestion || "static:5a33b10058114ae7876067447fde8242"}
                    </Confirm>
                )}
                container={pageStore.pageEl}
                pageStore={pageStore}
                hideBackdrop
                disableEscapeKeyDown
                disableOutsideClose
                hideOnResize={false}
                {...popoverProps[confirmquestionposition]}
            >
                {({onOpen, open}) => (
                    <>
                        <Component bc={bc} onClick={onOpen} disabled={disabled} open={open} />
                        {bc.uitype === "6" ? (
                            <ButtonConfirmEsc open={open} onOpen={onOpen} pageStore={pageStore} />
                        ) : null}
                    </>
                )}
            </Popover>
        );
    }

    return <Component bc={bc} onClick={onClick} disabled={disabled} open={popoverCtx.open} />;
});
