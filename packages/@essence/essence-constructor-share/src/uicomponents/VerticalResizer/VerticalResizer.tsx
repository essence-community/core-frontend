import * as React from "react";
import {createPortal} from "react-dom";
import cn from "clsx";
import {VerticalSizerIcon} from "../../icons";
import {getCoords} from "../../utils/html/getCoords";
import {useStyles} from "./VerticalResizer.styles";
import {IVerticalResizerProps} from "./VerticalResizer.types";

const LINE_HEIGHT = 10;

// eslint-disable-next-line max-lines-per-function, max-statements
export const VerticalResizer: React.FC<IVerticalResizerProps> = (props) => {
    const classes = useStyles(props);
    const {minHeight = 50, maxHeight = 1280, onChangeHeight, getInitialHeight, height, className} = props;
    const [down, setDown] = React.useState<boolean>(false);
    const [initialHeight, setInitialHeight] = React.useState<number>(0);
    const [lineWidth, setLineWidth] = React.useState<number>(0);
    const [lineY, setLineY] = React.useState<number>(0);
    const [lineYLeft, setLineYLeft] = React.useState<number>(0);
    const [over, setOver] = React.useState<boolean>(false);
    const [startOffset, setStartOffset] = React.useState<number>(0);
    const resizerRef = React.useRef<SVGSVGElement | null>(null);

    const handleChangeHeight = React.useCallback(
        (event: MouseEvent) => {
            let newHeight = event.pageY - startOffset + initialHeight;

            if (newHeight < minHeight + LINE_HEIGHT) {
                newHeight = minHeight;
            }

            if (newHeight > maxHeight + LINE_HEIGHT) {
                newHeight = maxHeight;
            }

            onChangeHeight(newHeight);
        },
        [initialHeight, maxHeight, minHeight, onChangeHeight, startOffset],
    );

    const setCursorPosition = React.useCallback((clientX: number, clientY: number) => {
        if (resizerRef.current) {
            resizerRef.current.style.top = `${clientY}px`;
            resizerRef.current.style.left = `${clientX}px`;
        }
    }, []);

    const handleMouseMove = React.useCallback(
        (event: MouseEvent) => {
            const newHeight = event.pageY - startOffset + initialHeight;

            if (down) {
                if (newHeight < minHeight - LINE_HEIGHT) {
                    setLineY(event.pageY + minHeight - newHeight - LINE_HEIGHT);
                } else if (newHeight > maxHeight) {
                    setLineY(event.pageY - newHeight + maxHeight);
                } else {
                    setLineY(event.pageY);
                }
            }

            setCursorPosition(event.clientX, event.clientY);
        },
        [down, initialHeight, maxHeight, minHeight, setCursorPosition, startOffset],
    );

    const handleMouseUp = React.useCallback(
        (event: MouseEvent) => {
            handleChangeHeight(event);
            setDown(false);
            setLineY(0);
            setStartOffset(0);

            if (document.body) {
                document.body.classList.remove("cursor-hidden");
            }
        },
        [handleChangeHeight],
    );

    const handleMouseDown = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const {currentTarget} = event;
            const {top, left} = getCoords(currentTarget);

            event.preventDefault();
            event.stopPropagation();

            setDown(true);
            setInitialHeight(!height && getInitialHeight ? getInitialHeight() : height);
            setLineWidth(currentTarget.offsetWidth);
            setLineY(event.pageY);
            setLineYLeft(left);
            setStartOffset(top + currentTarget.offsetHeight);

            if (document.body) {
                document.body.classList.add("cursor-hidden");
            }
        },
        [getInitialHeight, height],
    );

    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const {clientX, clientY} = event;

            // TODO: move to after setState
            setCursorPosition(clientX, clientY);

            setOver(true);
        },
        [setCursorPosition],
    );

    const handleMouseLeave = React.useCallback(() => {
        setOver(false);
    }, []);

    React.useEffect(() => {
        if (down || over) {
            document.addEventListener("mousemove", handleMouseMove);
        }

        if (down) {
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            if (down || over) {
                document.removeEventListener("mousemove", handleMouseMove);
            }

            if (down) {
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };
    }, [down, handleMouseMove, handleMouseUp, over]);

    return (
        <React.Fragment>
            <div
                className={cn(classes.resizer, className)}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {document.body && lineY
                ? createPortal(
                      <div
                          className={classes.line}
                          style={{
                              left: lineYLeft,
                              top: lineY,
                              width: lineWidth,
                          }}
                      />,
                      document.body,
                  )
                : null}
            {document.body && (over || down)
                ? createPortal(
                      <VerticalSizerIcon
                          ref={resizerRef}
                          fontSize="large"
                          className={cn(classes.resizerIcon, {[classes.resizerIconDown]: down})}
                      />,
                      document.body,
                  )
                : null}
        </React.Fragment>
    );
};
