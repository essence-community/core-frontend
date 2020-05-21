/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import React from "react";
import {preference, CARRY_LINES_REGEXP} from "../../constants";
import {debounce} from "../../utils";
import {useStyles} from "./Tooltip.styles";

const TIMEOUT_SHOW_TIME = preference.delayTooltipShow;
const OFFSET_CURSOR = preference.offsetTooltip;
const DEBOUNCE_TIME = preference.debounceTooltipTime;

export const prepareTip = (tip: string | null): string[] | null => (tip ? tip.split(CARRY_LINES_REGEXP) : null);
export const Tooltip: React.FC<{}> = (props) => {
    const classes = useStyles();
    const [inTooltip, setInTooltip] = React.useState(false);
    const [position, setPosition] = React.useState({
        left: 0,
        top: 0,
    });
    const [show, setShow] = React.useState(false);
    const [showBackdrop, setShowBackdrop] = React.useState(false);
    const [tip, setTip] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState<string[] | null>(null);
    const timerShow = React.useRef<any>();
    const [currentElement, setCurrentElement] = React.useState<HTMLElement | null>(null);
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
            current.style.left = isRightOut ? "auto" : `${left + OFFSET_CURSOR}px`;
            current.style.top = isBottomOut ? "auto" : `${top + OFFSET_CURSOR}px`;
            current.style.bottom = isBottomOut ? "10px" : "auto";
        }
    }, [inTooltip, position]);

    const getTipTitle = React.useCallback(() => {
        let target = element.current;

        while (target) {
            const tipNew = target.getAttribute("data-qtip");

            if (tipNew) {
                setCurrentElement(target);

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

        element.current = undefined;
        setCurrentElement(null);
        setInTooltip(false);
        setShow(false);
        setShowBackdrop(false);
        setTip(null);
        setTitle(null);
    }, []);

    const setShowTooltip = () => {
        setShow(true);
    };
    const showTooltip = React.useCallback(
        (event: MouseEvent) => {
            if (event.target instanceof HTMLElement) {
                element.current = event.target;

                const newTip = getTipTitle();

                if (newTip) {
                    requestAnimationFrame(() => {
                        if (newTip !== tip) {
                            clearTimeout(timerShow.current);
                            timerShow.current = setTimeout(setShowTooltip, TIMEOUT_SHOW_TIME);
                            makeHideTooltip(inTooltip);
                            setTip(newTip);
                            setTitle(prepareTip(newTip));
                            setPosition({left: event.clientX, top: event.clientY});
                        }
                    });
                } else {
                    clearTimeout(timerShow.current);
                    requestAnimationFrame(() => {
                        makeHideTooltip(inTooltip);
                    });
                }
            }
        },
        [getTipTitle, inTooltip, makeHideTooltip, tip],
    );

    const updateTooltipDebounce = debounce((left: number, top: number) => {
        setPosition({left, top});
    }, DEBOUNCE_TIME);

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
        [inTooltip, show, showTooltip],
    );

    const handleTooltipMouseOver = () => {
        setInTooltip(true);
    };

    const handleMouseDown = () => {
        setShowBackdrop(true);
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {target} = event;

        setShowBackdrop(false);

        if (target instanceof HTMLDivElement && target.className.indexOf(classes.tooltipBackdrop) !== -1) {
            setInTooltip(false);
            makeHideTooltip(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mousemove", updateTooltip);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mousemove", updateTooltip);
        };
    }, [handleMouseOver, updateTooltip]);

    React.useEffect(() => {
        setOffsetTooltip();
    }, [props, setOffsetTooltip]);

    const isValidTitle = title && title.length > 0;

    if (show && currentElement && isValidTitle) {
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
