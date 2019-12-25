import {Icon} from "@essence/essence-constructor-share/Icon";
import {ButtonBase} from "@material-ui/core";
import * as React from "react";
import {useStyles} from "./ScrollButton.styles";
import {IScrollButtonProps} from "./ScrollButton.types";

const iconName = {
    horizontal: {
        left: "arrow-left",
        right: "arrow-right",
    },
    vertical: {
        left: "arrow-up",
        right: "arrow-down",
    },
};

export const ScrollButton: React.FC<IScrollButtonProps> = (props) => {
    const {direction, orientation, visible, onClick} = props;
    const classes = useStyles(props);

    if (!visible && orientation === "vertical") {
        return null;
    }

    // @ts-ignore
    const className = classes[`${orientation}Button`];

    return (
        <ButtonBase onClick={onClick} className={className} disableRipple tabIndex={-1}>
            <Icon
                iconfont={iconName[orientation][direction]}
                size="2x"
                className={visible ? classes.active : classes.disable}
            />
        </ButtonBase>
    );
};
