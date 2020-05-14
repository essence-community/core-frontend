import * as React from "react";
import cn from "clsx";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {PopoverContext, FormContext} from "@essence-community/constructor-share/context";
import {useObserver} from "mobx-react-lite";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {useStyles} from "./GridHFIcon.styles";

interface IGridHFIconProps {
    bc: IBuilderConfig;
    disabled?: boolean;
}

export const GridHFIcon: React.FC<IGridHFIconProps> = ({bc, disabled}) => {
    const {column} = bc;
    const popoverCtx = React.useContext(PopoverContext);
    const form = React.useContext(FormContext);
    const classes = useStyles();

    return useObserver(() => {
        const isFilled =
            column &&
            Object.keys(form.values).some((key) => {
                if (key.indexOf(column) === -1) {
                    return false;
                }

                return !isEmpty(form.values[key]);
            });

        const className = cn(classes.popoverWrapper, {
            [classes.popoverWrapperFilled]: isFilled,
            [classes.popoverWrapperDisabled]: disabled,
            [classes.popoverWrapperOpen]: popoverCtx.open,
        });

        return (
            <div className={className} onClick={popoverCtx.onOpen}>
                <Icon iconfont="caret-down" size="xs" />
            </div>
        );
    });
};
