// @flow
import {Icon} from "@essence/essence-constructor-share/Icon";
import {Badge, ButtonBase} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {useTranslation} from "@essence/essence-constructor-share/utils";
import * as React from "react";
import {useStyles} from "./NotificationsReadButton.styles";
import {INotificationsReadButtonProps} from "./NotificationsReadButton.types";

export const NotificationsReadButton: React.FC<INotificationsReadButtonProps> = (props) => {
    const {snackbarStore} = props;
    const classes = useStyles(props);
    const [trans] = useTranslation("meta");

    return useObserver(() => {
        const disabled = !snackbarStore.snackbarsInStatusToReadCount;

        return (
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
                    data-qtip={trans("f42e28fe1287412fa6ec91b421377139")}
                    data-page-object="snackbar-read-all"
                >
                    <Icon iconfont="bell" iconfontname="fa" size="2x" />
                </ButtonBase>
            </Badge>
        );
    });
};

export default NotificationsReadButton;
