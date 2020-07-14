import * as React from "react";
import {createPortal} from "react-dom";
import cn from "clsx";
import {Grid} from "@material-ui/core";
import {debounce} from "../../utils";
import {getCoords} from "../../utils/html/getCoords";
import {HorizontalSizerIcon} from "../../icons";
import {getWidth} from "./getWidth";
import {useStyles} from "./HorizontalResizer.styles";

interface IItemProps {
    id: string;
    width: number;
    collapsed: boolean;
}

interface IHorizontalResizerProps {
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
    xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | boolean;
    isAddResizer: boolean;
    item: IItemProps;
    itemsNumber: number;
    nextItem?: IItemProps;
    onChange: (id: string, newWidth: number, side?: "right" | "left") => void;
}

const DEBOUNCE_DELAY = 0;
const MAX_PERCENT = 100;
const INITIAL_STATE = {
    down: false,
    initialWidthPercent: 0,
    initialWidthPx: 0,
    initialX: 0,
};

// eslint-disable-next-line max-lines-per-function, max-statements
export const HorizontalResizer: React.FC<IHorizontalResizerProps> = (props) => {
    const {onChange, xs, isAddResizer} = props;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const resizerRef = React.useRef<HTMLDivElement>(null);
    const lineRef = React.useRef<HTMLDivElement>(null);
    const newWidth = React.useRef<number | undefined>(undefined);
    const classes = useStyles();

    const [down, setDown] = React.useState(false);
    const [over, setOver] = React.useState(false);

    const stateRef = React.useRef(INITIAL_STATE);
    const cssCursorRef = React.useRef<React.CSSProperties>();
    const cssLineRef = React.useRef<React.CSSProperties>();
    const propsCacheRef = React.useRef<[IItemProps, IItemProps | undefined]>([props.item, props.nextItem]);

    React.useEffect(() => {
        propsCacheRef.current = [props.item, props.nextItem];
    }, [props.item, props.nextItem]);

    const setCursorPosition = React.useCallback((clientX: number, clientY: number) => {
        if (resizerRef.current) {
            resizerRef.current.style.top = `${clientY}px`;
            resizerRef.current.style.left = `${clientX}px`;
        }
    }, []);

    const setLinePosition = React.useCallback((clientX: number) => {
        if (lineRef.current) {
            lineRef.current.style.left = `${clientX}px`;
        }
    }, []);

    const handleMouseMove = React.useCallback(
        debounce((event: MouseEvent) => {
            const {clientX, clientY} = event;
            const {initialX, initialWidthPx, initialWidthPercent} = stateRef.current;

            if (stateRef.current.down) {
                const [item, nextItem] = propsCacheRef.current;
                const offset = initialX - clientX;
                const newWidthCalc = getWidth(initialWidthPx, initialWidthPercent, offset);
                const maxWidth = nextItem ? (nextItem.width || 0) + (item.width || 0) : item.width || 0;

                if (item.id && newWidthCalc <= maxWidth && newWidthCalc > 0) {
                    newWidth.current = newWidthCalc;
                    setLinePosition(clientX);
                }
            }

            setCursorPosition(clientX, clientY);
        }, DEBOUNCE_DELAY),
        [],
    );

    const handleMouseUp = React.useCallback(() => {
        const [item] = propsCacheRef.current;

        setDown(false);
        stateRef.current = {
            down: false,
            initialWidthPercent: 0,
            initialWidthPx: 0,
            initialX: 0,
        };

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        if (item.id && newWidth.current !== undefined) {
            onChange(item.id, newWidth.current);
        }

        newWidth.current = undefined;

        if (document.body) {
            document.body.classList.remove("cursor-hidden");
        }
    }, [handleMouseMove, onChange]);

    const handleMouseDown = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const {currentTarget, clientX} = event;
            const {left} = getCoords(currentTarget);
            const {current} = rootRef;
            const clientWidth = current ? current.clientWidth : 0;
            const [item] = propsCacheRef.current;

            event.preventDefault();
            event.stopPropagation();

            setDown(true);

            stateRef.current = {
                down: true,
                // For collapsed panel calcuate offset width relative to resizer and full panel
                initialWidthPercent:
                    item.collapsed && current
                        ? (currentTarget.offsetWidth / (current.parentElement?.parentElement?.offsetWidth || 0)) *
                          MAX_PERCENT
                        : item.width,
                initialWidthPx: item.collapsed ? currentTarget.offsetWidth : clientWidth,
                initialX: left,
            };

            cssLineRef.current = {
                left: clientX,
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            if (document.body) {
                document.body.classList.add("cursor-hidden");
            }
        },
        [handleMouseMove, handleMouseUp],
    );

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {clientX, clientY} = event;

        setOver(true);

        cssCursorRef.current = {
            left: clientX,
            top: clientY,
        };

        document.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
        setOver(false);

        if (!stateRef.current.down) {
            document.removeEventListener("mousemove", handleMouseMove);
        }
    };

    React.useEffect(() => {
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove, handleMouseUp]);

    const renderResizer = () => {
        const isShowResizer = document.body && (over || down);
        const nextCollapsed = props.nextItem && props.nextItem.collapsed;

        return (
            <Grid item xs={xs} className={props.className} style={props.style} zeroMinWidth>
                <div className={cn(classes.resizeContainer)} ref={rootRef}>
                    <div className={cn(classes.childrenContainer, {[classes.containerHide]: props.item.collapsed})}>
                        {props.children}
                    </div>
                    <div className={classes.resizerWrapper}>
                        <div
                            className={cn(classes.resizer, {
                                [classes.show]: stateRef.current.initialX && !down,
                            })}
                            onMouseDown={handleMouseDown}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                </div>
                {down && <div ref={lineRef} className={classes.dottedLine} style={cssLineRef.current} />}
                {isShowResizer
                    ? createPortal(
                          <div
                              ref={resizerRef}
                              style={cssCursorRef.current}
                              className={cn(
                                  classes.resizerRootIcon,
                                  nextCollapsed ? classes.resizerRootRight : classes.resizerRootLeft,
                                  {
                                      [classes.resizerRootIconDown]: down,
                                      [classes.resizerRootCollapsed]: props.item.collapsed || nextCollapsed,
                                  },
                              )}
                          >
                              <HorizontalSizerIcon className={classes.resizerIcon} fontSize="large" />
                          </div>,
                          document.body,
                      )
                    : null}
            </Grid>
        );
    };

    return isAddResizer ? (
        renderResizer()
    ) : (
        <Grid
            item
            xs={xs}
            className={props.item.collapsed ? cn(props.className, classes.containerHide) : props.className}
            style={props.style}
            zeroMinWidth
        >
            {props.children}
        </Grid>
    );
};
