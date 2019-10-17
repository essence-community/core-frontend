import * as React from "react";
import {useStyles} from "./SideResizer.styles";

interface ISideResizerProps {
    anchor: "left" | "right";
    minDrawerWidth: string;
    maxDrawerWidth: string;
    onChangeWidth: (newWidth: string) => void;
}

export const SideResizer: React.FC<ISideResizerProps> = (props) => {
    const {anchor, minDrawerWidth, maxDrawerWidth, onChangeWidth} = props;
    const startOffsetRef = React.useRef<number>(0);
    const classes = useStyles();

    const handleMouseMove = React.useCallback(
        (event: MouseEvent) => {
            const offset = anchor === "right" ? window.innerWidth - event.pageX : event.pageX;
            const newWidthCalc = (offset / window.innerWidth) * 100;
            let newWidth = `${newWidthCalc}%`;

            if (newWidthCalc <= parseInt(minDrawerWidth, 10)) {
                newWidth = minDrawerWidth;
            }

            if (newWidthCalc >= parseInt(maxDrawerWidth, 10)) {
                newWidth = maxDrawerWidth;
            }

            onChangeWidth(newWidth);
        },
        [anchor, maxDrawerWidth, minDrawerWidth, onChangeWidth],
    );

    const handleMouseUp = React.useCallback(() => {
        startOffsetRef.current = 0;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault();
            event.stopPropagation();

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
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
        <div className={classes.sideResizer} onMouseDown={handleMouseDown}>
            <div className={classes.btnResizer}>
                <span className={classes.textResizer} />
            </div>
        </div>
    );
};

export default SideResizer;
