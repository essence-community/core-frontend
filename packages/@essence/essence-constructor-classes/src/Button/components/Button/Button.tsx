import * as React from "react";
import cn from "clsx";
import {Button as MuiButton, Typography} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {getColor} from "../../utils/getColor";
import {IButtonInternalProps} from "../../Button.types";
import {useStyles} from "./Button.styles";

export const Button: React.FC<IButtonInternalProps> = (props) => {
    const [trans] = useTranslation("meta");
    const classes = useStyles();
    const {iconfont, iconfontname = "fa", tipmsg, uitype, iconsize} = props.bc;
    const displayed = props.bc[VAR_RECORD_DISPLAYED];
    const qtip = tipmsg || displayed;

    return (
        <MuiButton
            color={getColor(props.bc.uitype)}
            className={cn(classes[`uitype-${uitype}` as keyof typeof classes])}
            data-qtip={qtip ? trans(qtip) : ""}
            onClick={props.onClick}
            disabled={props.disabled}
            variant={uitype === "8" ? "text" : "contained"}
            data-page-object={props.bc[VAR_RECORD_PAGE_OBJECT_ID]}
            type={uitype === "5" ? "submit" : undefined}
        >
            {iconfont ? (
                <Icon iconfont={iconfont} iconfontname={iconfontname as "fa" | "mdi"} size={iconsize} color="inherit" />
            ) : null}
            {iconfont ? "\u00A0" : null}
            <Typography variant="button" className={classes.displayed} noWrap display="inline">
                {displayed ? trans(displayed) : displayed}
            </Typography>
        </MuiButton>
    );
};
