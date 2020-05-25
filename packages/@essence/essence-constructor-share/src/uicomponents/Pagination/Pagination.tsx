import * as React from "react";
import cn from "clsx";
import {IconButton, Typography} from "@material-ui/core";
import {useTranslation} from "../../utils/I18n";
import {Icon} from "../../Icon";
import {useStyles} from "./Pagination.styles";

interface IPaginationProps {
    disabled?: boolean;
    onChangePage: (pageNumber: number) => void;
    page: number;
    count: number;
    rowsPerPage: number;
    ckPageObject: string;
    className?: string;
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
    const {count, page, rowsPerPage, ckPageObject, disabled} = props;
    const pages = Math.ceil(props.count / props.rowsPerPage);
    const classes = useStyles(props);

    const [trans] = useTranslation("meta");

    const handleFirstPageButtonClick = () => {
        props.onChangePage(0);
    };

    const handleBackButtonClick = () => {
        props.onChangePage(props.page - 1);
    };

    const handleNextButtonClick = () => {
        props.onChangePage(props.page + 1);
    };

    const handleLastPageButtonClick = () => {
        props.onChangePage(Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1));
    };

    return (
        <div className={cn(classes.root, props.className)}>
            <IconButton
                data-qtip={trans("static:23264e86a9cd446f83cee0eb86c20bd9")}
                color="primary"
                onClick={handleFirstPageButtonClick}
                classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                disabled={disabled || page === 0}
                aria-label="First Page"
                disableRipple
                data-page-object={`${ckPageObject}-first-page`}
            >
                <Icon iconfont="angle-double-left" />
            </IconButton>
            <IconButton
                data-qtip={trans("static:267e96bb282843abaa25b3e78bd874f1")}
                color="primary"
                onClick={handleBackButtonClick}
                classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                disabled={disabled || page === 0}
                aria-label="Previous Page"
                data-page-object={`${ckPageObject}-previous-page`}
                disableRipple
            >
                <Icon iconfont="angle-left" />
            </IconButton>
            <Typography
                variant="body2"
                classes={{root: classes.typoRoot}}
                data-page-object={`${ckPageObject}-current-page`}
            >
                {trans("static:3dd42493c346447897d017af3668d998", {currentpage: pages > 0 ? props.page + 1 : 0, pages})}
            </Typography>

            <IconButton
                data-qtip={trans("static:d4d9e481a0e14bbd9e1e76537e8cbfd0")}
                color="primary"
                onClick={handleNextButtonClick}
                classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
                data-page-object={`${ckPageObject}-next-page`}
                disableRipple
            >
                <Icon iconfont="angle-right" />
            </IconButton>
            <IconButton
                data-qtip={trans("static:d0f0a046dee344d1b5bbbadcd8d848db")}
                color="primary"
                onClick={handleLastPageButtonClick}
                classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
                data-page-object={`${ckPageObject}-last-page`}
                disableRipple
            >
                <Icon iconfont="angle-double-right" />
            </IconButton>
        </div>
    );
};
