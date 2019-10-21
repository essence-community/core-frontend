// @flow
import {Icon} from "@essence/essence-constructor-share/Icon";
import {Badge, ButtonBase} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useStyles} from "./NotificationsReadButton.styles";
import {INotificationsReadButtonProps} from "./NotificationsReadButton.types";

export const NotificationsReadButton: React.FC<INotificationsReadButtonProps> = (props) => {
    const {snackbarStore} = props;
    const disabled = !snackbarStore.snackbarsInStatusToReadCount;
    const classes = useStyles(props);

    return useObserver(() => (
        <Badge
            badgeContent={snackbarStore.snackbarsInStatusToReadCount}
            classes={{badge: disabled ? `${classes.badge} ${classes.badgeDisabled}` : classes.badge}}
            color="primary"
        >
            <ButtonBase
                onClick={snackbarStore.readActiveSnackbarsAction}
                classes={{
                    disabled: classes.disabledBtn,
                    root: classes.btn,
                }}
                disabled={disabled}
                disableRipple
                data-qtip="Прочитать все"
                data-page-object="snackbar-read-all"
            >
                <Icon iconfont="bell" iconfontname="fa" size="2x" />
            </ButtonBase>
        </Badge>
    ));
};

export default NotificationsReadButton;
