import * as React from "react";
import {MenuItem} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share";
import {ISuggestion} from "../store/FieldComboModel.types";
import {useStyles} from "./FieldComboListItem.styles";

interface IProps {
    suggestion: ISuggestion;
    isSelectedValue: boolean;
    isHighlightedValue: boolean;
    ckPageObject: string;
    onSelect: (event: React.SyntheticEvent, suggestion: ISuggestion) => void;
    focused?: boolean;
}

export const FieldComboListItem = React.memo((props: IProps) => {
    const classes = useStyles(props);
    const handleClick = (event: React.SyntheticEvent) => {
        props.onSelect(event, props.suggestion);
    };

    return (
        <MenuItem
            component="div"
            classes={{root: classes.menuItem}}
            disableRipple
            onClick={handleClick}
            selected={props.isHighlightedValue}
            data-page-object={`${props.ckPageObject}-item-${String(props.suggestion.value)}`}
            data-qtip={props?.focused ? "" : props.suggestion.label}
        >
            <span className={`${classes.menuItemLabel} ${props.isSelectedValue ? classes.menuItemSelectedLabel : ""}`}>
                {props.suggestion.label}
            </span>
            {props.isSelectedValue ? (
                <span className={classes.menuItemSelectedCheck}>
                    <Icon iconfontname="mdi" iconfont="mdi-check" />
                </span>
            ) : null}
        </MenuItem>
    );
});
