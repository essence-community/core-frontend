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
    className?: string;
}

export const GridHFIcon: React.FC<IGridHFIconProps> = (props) => {
    const {bc, disabled} = props;
    const {column} = bc;
    const popoverCtx = React.useContext(PopoverContext);
    const form = React.useContext(FormContext);
    const classes = useStyles();

    return useObserver(() => {
        const isFilled =
            column &&
            Object.keys(form.values).some((key) => {
                if (key === column) {
                    return !isEmpty(form.values[key]);
                }

                if (
                    bc.datatype === "date" &&
                    (key === `${column}_st` || key === `${column}_en` || key === `${column}_eq`)
                ) {
                    return !isEmpty(form.values[key]);
                }

                return false;
            });

        const className = cn(classes.popoverWrapper, props.className, {
            [classes.popoverWrapperFilled]: isFilled,
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
