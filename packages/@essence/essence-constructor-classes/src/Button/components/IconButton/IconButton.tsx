import * as React from "react";
import cn from "clsx";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton as MuiIconButton, Fab, useTheme} from "@material-ui/core";
import {getColor} from "../../utils/getColor";
import {IButtonInternalProps} from "../../Button.types";
import {useStyles} from "./IconButton.styles";

export const IconButton: React.FC<IButtonInternalProps> = (props) => {
    const [trans] = useTranslation("meta");
    const theme = useTheme();
    const classes = useStyles();
    const {bc} = props;
    const {iconfont, iconfontname, iconsize} = bc;
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const qtip = bc.tipmsg || displayed;
    const isActionButton = bc.uitype === "4" || bc.uitype === "14" || bc.uitype === "5";
    const isSubmit = bc.uitype === "14" || bc.uitype === "5";
    const icon = iconfont ? (
        <Icon iconfont={iconfont} iconfontname={iconfontname as "fa" | "mdi"} size={iconsize} color="inherit" />
    ) : null;

    const buttonProps = {
        className: cn(classes[`uitype-${bc.uitype}` as keyof typeof classes], {[classes.open]: props.open}),
        "data-page-object": bc[VAR_RECORD_PAGE_OBJECT_ID],
        "data-qtip": qtip ? trans(qtip) : "",
        disabled: props.disabled,
        onClick: props.onClick,
    };

    // Fab for add or save
    if (theme.palette.type === "dark" && isActionButton) {
        return (
            <Fab {...buttonProps} color={getColor(bc.uitype)} size="small" type={isSubmit ? "submit" : undefined}>
                {icon}
                {bc.required ? <span className={classes.highlightFab}>*</span> : null}
            </Fab>
        );
    }

    return (
        <MuiIconButton
            {...buttonProps}
            tabIndex={bc.uitype === "7" ? -1 : undefined}
            type={isSubmit ? "submit" : undefined}
            color={bc.uitype === "11" || bc.uitype === "12" ? "inherit" : getColor(bc.uitype)}
        >
            {icon}
            {bc.required ? <span className={classes.highlight}>*</span> : null}
        </MuiIconButton>
    );
};
