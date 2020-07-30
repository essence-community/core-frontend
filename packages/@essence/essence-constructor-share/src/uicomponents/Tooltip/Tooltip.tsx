/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import React from "react";
import {CARRY_LINES_REGEXP} from "../../constants";
import {debounce, getPreference} from "../../utils";
import {useStyles} from "./Tooltip.styles";

export const prepareTip = (tip: string | null): string[] | null => (tip ? tip.split(CARRY_LINES_REGEXP) : null);
export const Tooltip = () => {
    const preference = getPreference();
    const classes = useStyles();
    const [inTooltip, setInTooltip] = React.useState(false);
    const [position, setPosition] = React.useState({
        left: 0,
        top: 0,
    });
    const [show, setShow] = React.useState(false);
    const [showBackdrop, setShowBackdrop] = React.useState(false);
    const [, setTip] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState<string[] | null>(null);
    const timerShow = React.useRef<any>();
    const currentElement = React.useRef<HTMLElement>();
    const element = React.useRef<HTMLElement>();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const setOffsetTooltip = React.useCallback(() => {
        const {current} = contentRef;

        if (current && !inTooltip) {
            const {left, top} = position;
            const isRightOut = left + current.offsetWidth > window.innerWidth;
            const isBottomOut = top + current.offsetHeight > window.innerHeight;

            current.style.right = isRightOut ? "10px" : "auto";
            current.style.left = isRightOut ? "auto" : `${left + preference.offsetTooltip}px`;
            current.style.top = isBottomOut ? "auto" : `${top + preference.offsetTooltip}px`;
            current.style.bottom = isBottomOut ? "10px" : "auto";
        }
    }, [inTooltip, position, preference.offsetTooltip]);

    const getTipTitle = React.useCallback(() => {
        let target = element.current;

        while (target) {
            const tipNew = target.getAttribute("data-qtip");

            if (tipNew) {
                currentElement.current = target;

                return tipNew;
            }

            target = target.parentElement || undefined;
        }

        return "";
    }, []);
    const makeHideTooltip = React.useCallback((val: boolean) => {
        if (val) {
            return;
        }

        setInTooltip(false);
        setShow(false);
        setShowBackdrop(false);
        setTip(null);
        setTitle(null);
    }, []);

    const showTooltip = React.useCallback(
        (event: MouseEvent) => {
            if (event.target instanceof HTMLElement) {
                element.current = event.target;

                const newTip = getTipTitle();

                if (newTip) {
                    requestAnimationFrame(() => {
                        setTip((tip) => {
                            if (newTip !== tip) {
                                clearTimeout(timerShow.current);
                                timerShow.current = setTimeout(() => {
                                    setShow(true);
                                    setPosition({left: event.clientX, top: event.clientY});
                                }, preference.delayTooltipShow);
                                makeHideTooltip(inTooltip);
                                setTitle(prepareTip(newTip));

                                return newTip;
                            }

                            return tip;
                        });
                    });
                } else {
                    clearTimeout(timerShow.current);
                    requestAnimationFrame(() => {
                        makeHideTooltip(inTooltip);
                    });
                }
            }
        },
        [getTipTitle, makeHideTooltip, inTooltip, preference.delayTooltipShow],
    );

    const updateTooltipDebounce = React.useMemo(
        () =>
            debounce((left: number, top: number) => {
                requestAnimationFrame(() => {
                    setPosition({left, top});
                });
            }, preference.debounceTooltipTime),
        [preference.debounceTooltipTime],
    );

    const updateTooltip = React.useCallback(
        (event: MouseEvent) => {
            updateTooltipDebounce(event.clientX, event.clientY);
        },
        [updateTooltipDebounce],
    );

    const handleMouseOver = React.useCallback(
        (event: MouseEvent) => {
            const {target} = event;
            const {current} = rootRef;

            if (target instanceof HTMLElement) {
                if (target && target.nodeName === "svg" && show) {
                    return setShow(false);
                }

                if (inTooltip && (!current || !current.contains(target))) {
                    return setInTooltip(false);
                }
            }
            showTooltip(event);

            return undefined;
        },
        [show, inTooltip, showTooltip],
    );

    const handleTooltipMouseOver = React.useCallback(() => {
        setInTooltip(true);
    }, []);

    const handleMouseDown = React.useCallback(() => {
        setShowBackdrop(true);
    }, []);

    const handleMouseUp = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const {target} = event;

            setShowBackdrop(false);

            if (target instanceof HTMLDivElement && target.className.indexOf(classes.tooltipBackdrop) !== -1) {
                setInTooltip(false);
                makeHideTooltip(false);
            }
        },
        [classes.tooltipBackdrop, makeHideTooltip],
    );

    React.useEffect(() => {
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [handleMouseOver]);

    React.useEffect(() => {
        document.addEventListener("mousemove", updateTooltip);

        return () => {
            document.removeEventListener("mousemove", updateTooltip);
        };
    }, [updateTooltip]);

    React.useEffect(() => {
        setOffsetTooltip();
    }, [setOffsetTooltip]);

    const isValidTitle = title && title.length > 0;

    if (show && currentElement.current && isValidTitle) {
        return (
            <React.Fragment>
                <div
                    className={classes.tooltipRoot}
                    ref={rootRef}
                    onMouseOver={handleTooltipMouseOver}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <div className={classes.tooltipContent} ref={contentRef}>
                        {title && title.map((text, index) => <div key={index}>{text}</div>)}
                    </div>
                    {showBackdrop ? <div className={classes.tooltipBackdrop} /> : null}
                </div>
            </React.Fragment>
        );
    }

    return null;
};
