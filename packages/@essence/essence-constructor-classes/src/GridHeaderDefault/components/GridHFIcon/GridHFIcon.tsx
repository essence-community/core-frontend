import * as React from "react";
import cn from "clsx";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {useObserver} from "mobx-react";
import {useStyles} from "./GridHFIcon.styles";

interface IGridHFIconProps {
    bc: IBuilderConfig;
    disabled?: boolean;
    className?: string;
}

export const GridHFIcon: React.FC<IGridHFIconProps> = (props) => {
    const {disabled} = props;
    const popoverCtx = React.useContext(PopoverContext);
    const classes = useStyles();

    return useObserver(() => {
        const className = cn(classes.popoverWrapper, props.className, {
            [classes.popoverWrapperDisabled]: disabled,
            [classes.popoverWrapperOpen]: popoverCtx.open,
        });

        return (
            <div className={className} onClick={popoverCtx.onOpen}>
                <Icon iconfont="caret-down" size="xs" className={classes.icon} />
            </div>
        );
    });
};
