import * as React from "react";
import {createPortal} from "react-dom";
import cn from "clsx";
import {HorizontalSizerIcon} from "../../icons";
import {useStyles} from "./SideResizer.styles";

interface ISideResizerProps {
    anchor: "left" | "right";
    minDrawerWidth: string;
    maxDrawerWidth: string;
    point?: "px" | "percent";
    onChangeWidth: (newWidth: string) => void;
}

export const SideResizer: React.FC<ISideResizerProps> = React.memo((props) => {
    const {anchor, minDrawerWidth, maxDrawerWidth, onChangeWidth, point} = props;
    const downRef = React.useRef<boolean>(false);
    const classes = useStyles();
    const [down, setDown] = React.useState(false);
    const [over, setOver] = React.useState(false);
    const [pos, setPos] = React.useState<React.CSSProperties>({});
    const isShowResizer = over || down;

    const handleMouseMove = React.useCallback(
        (event: MouseEvent) => {
            const {clientX, clientY} = event;

            setPos({left: clientX, top: clientY});

            if (downRef.current) {
                const offset = anchor === "right" ? window.innerWidth - event.pageX : event.pageX;
                const newWidthCalc = (offset / window.innerWidth) * 100;
                let newWidth = `${newWidthCalc}%`;

                if (point === "px") {
                    if (offset <= parseInt(minDrawerWidth, 10)) {
                        newWidth = minDrawerWidth;
                    }

                    if (offset >= parseInt(maxDrawerWidth, 10)) {
                        newWidth = maxDrawerWidth;
                    }
                } else {
                    if (newWidthCalc <= parseInt(minDrawerWidth, 10)) {
                        newWidth = minDrawerWidth;
                    }

                    if (newWidthCalc >= parseInt(maxDrawerWidth, 10)) {
                        newWidth = maxDrawerWidth;
                    }
                }

                onChangeWidth(newWidth);
            }
        },
        [anchor, maxDrawerWidth, minDrawerWidth, onChangeWidth, point],
    );

    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const {clientX, clientY} = event;

            setOver(true);
            setPos({left: clientX, top: clientY});

            document.addEventListener("mousemove", handleMouseMove);
        },
        [handleMouseMove],
    );

    const handleMouseLeave = React.useCallback(() => {
        setOver(false);

        if (!downRef.current) {
            document.removeEventListener("mousemove", handleMouseMove);
        }
    }, [handleMouseMove]);

    const handleMouseUp = React.useCallback(() => {
        setDown(false);
        downRef.current = false;

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        if (document.body) {
            document.body.classList.remove("cursor-hidden");
        }
    }, [handleMouseMove]);

    const handleMouseDown = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault();
            event.stopPropagation();

            setDown(true);
            downRef.current = true;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            if (document.body) {
                document.body.classList.add("cursor-hidden");
            }
        },
        [handleMouseMove, handleMouseUp],
    );

    React.useEffect(() => {
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <>
            <div
                className={classes.sideResizer}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={classes.btnResizer}>
                    <span className={classes.textResizer} />
                </div>
            </div>
            {isShowResizer
                ? createPortal(
                      <div
                          style={pos}
                          className={cn(classes.resizerRootIcon, {
                              [classes.resizerRootIconDown]: down,
                          })}
                      >
                          <HorizontalSizerIcon className={classes.resizerIcon} fontSize="large" />
                      </div>,
                      document.body,
                  )
                : null}
        </>
    );
});
