import {useState, useEffect} from "react";
import {IHookIsOpenProps} from "./Popover.types";

export function useIsOpen({
    container,
    pageStore,
    hideOnScroll,
    disableOutsideClose,
    onChangeOpen,
    setStyle,
    open,
    onOutsideClick,
    onResize,
}: IHookIsOpenProps): [boolean, () => void, () => void] {
    const [isOpen, setIsOpen] = useState(false);

    // TODO: removeEventListener и addEventListener не рабоают как ожидаются в hooks
    const handleClose = () => {
        if (container && !disableOutsideClose) {
            container.removeEventListener("mousedown", onOutsideClick);
        }

        if (pageStore && hideOnScroll) {
            pageStore.removeScrollEvent(handleClose);
        }

        window.removeEventListener("resize", onResize);

        setIsOpen(false);
        setStyle({left: 0, top: 0});
        onChangeOpen(false);
    };

    const handleOpen = () => {
        if (!isOpen) {
            if (container && !disableOutsideClose) {
                container.addEventListener("mousedown", onOutsideClick);
            }

            if (pageStore && hideOnScroll) {
                pageStore.addScrollEvent(handleClose);
            }

            window.addEventListener("resize", onResize);

            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (open) {
            handleOpen();
        }

        if (!open) {
            handleClose();
        }
    }, [open]);

    useEffect(() => {
        return () => {
            handleClose();
        };
    }, []);

    return [isOpen, handleOpen, handleClose];
}
