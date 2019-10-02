import {Icon} from "@essence/essence-constructor-share/Icon";
import {ButtonBase} from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./ScrollButton.style";
import { IScrollButtonProps } from "./ScrollButton.types";

const iconName = {
    "horizontal": {
        "left": "arrow-left",
        "right": "arrow-right",
    },
    "vertical": {
        "left": "arrow-up",
        "right": "arrow-down",
    },
};
export const ScrollButton = (props: IScrollButtonProps) => {
    const { direction, orientation, visible, onClick } = props;
    const ref = React.useRef(null);
    const classes: Record<string, string> = useStyles(props);

    if (!visible && orientation === "vertical") {
        return null;
    }

    return (
        <ButtonBase
            onClick={onClick}
            className={classes[`${orientation}Button`]}
            disableRipple
            tabIndex={-1}
            buttonRef={ref}
        >
            <Icon
                iconfont={iconName[orientation][direction]}
                size="2x"
                className={visible ? classes.active : classes.disable}
            />
        </ButtonBase>
    );
};