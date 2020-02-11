// @flow
import * as React from "react";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import styles from "./ContentStyles";

type VerticalSizeType = "16" | "8";
type HorizontalSizeType = "16";
type ContentType = "detail";

/**
 * PropsType
 *
 * verticalSize - top-botton size
 * horizontalSize - left-right size
 */
type PropsType = {
    className?: string,
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
    verticalSize?: VerticalSizeType,
    horizontalSize?: HorizontalSizeType,
    contentType?: ContentType,
    buttonHeight?: boolean,
    children: React.Node,
    visible?: boolean,
    setRef?: (node: ?HTMLDivElement) => void,
};

const Content = ({
    className,
    children,
    classes,
    verticalSize = "",
    horizontalSize = "",
    contentType = "",
    buttonHeight,
    setRef,
    visible,
    ...otherProps
}: PropsType) => (
    <div
        {...otherProps}
        className={cn(className, classes.root, {
            [classes[`vertical${verticalSize}`]]: verticalSize,
            [classes[`horizontal${horizontalSize}`]]: horizontalSize,
            [classes[`contentType-${contentType}`]]: contentType,
            [classes.buttonHeight]: buttonHeight,
            [classes.hidden]: visible === false,
        })}
        ref={setRef}
    >
        {children}
    </div>
);

export default withStyles(styles)(Content);
