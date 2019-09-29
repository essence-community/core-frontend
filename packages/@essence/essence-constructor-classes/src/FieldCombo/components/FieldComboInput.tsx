import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {IconButton, InputAdornment} from "@material-ui/core";
import {IBuilderConfig, Icon} from "@essence/essence-constructor-share";
import {FieldComboModel} from "../store/FieldComboModel";
import {useStyles} from "./FieldComboInput.styles";

interface IProps {
    textField: React.ComponentType;
    open: boolean;
    store: FieldComboModel;
    bc: IBuilderConfig;
    onClose: (event: React.SyntheticEvent) => void;
    onOpen: () => void;
}

export const FieldComboInput: React.FC<IProps> = (props) => {
    const classes = useStyles(props);
    const {textField: TextField, onClose, onOpen, open, ...otherProps} = props;
    const handleInputClick = () => {
        if (!open) {
            onOpen();
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.store.handleChangeValue(event.target.value);
    };
    const chevron = open ? (
        <IconButton
            color="secondary"
            onClick={onClose}
            disableRipple
            tabIndex={-1}
            className={classes.iconRoot}
            data-page-object={`${props.bc.ckPageObject}-chevron-up`}
        >
            <Icon iconfont="chevron-up" />
        </IconButton>
    ) : (
        <IconButton
            color="secondary"
            onClick={onOpen}
            disableRipple
            tabIndex={-1}
            className={classes.iconRoot}
            data-page-object={`${props.bc.ckPageObject}-chevron-down`}
        >
            <Icon iconfont="chevron-down" />
        </IconButton>
    );

    return useObserver(() => (
        // @ts-ignore
        <TextField
            {...otherProps}
            InputProps={{
                // @ts-ignore
                ...otherProps.InputProps,
                // @ts-ignore
                endAdornment: <InputAdornment position="end">{[...props.tips, chevron]}</InputAdornment>,
            }}
            value={props.store.inputValue}
            onClick={handleInputClick}
            onChange={handleChange}
        />
    ));
};
