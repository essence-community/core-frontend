import * as React from "react";
import {IconButton, Typography} from "@material-ui/core";
import {Icon} from "../../Icon";
import {useStyles} from "./Pagination.styles";

interface IPaginationProps {
    disabled?: boolean;
    onChangePage: (pageNumber: number) => void;
    page: number;
    count: number;
    rowsPerPage: number;
    ckPageObject: string;
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
    const {count, page, rowsPerPage, ckPageObject, disabled} = props;
    const pages = Math.ceil(props.count / props.rowsPerPage);
    const classes = useStyles(props);

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
        <div className={classes.root}>
            <IconButton
                data-qtip="Первая страница"
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
                data-qtip="Предыдущая страница"
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
                {pages > 0 ? props.page + 1 : 0} из {pages}
            </Typography>

            <IconButton
                data-qtip="Следующая страница"
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
                data-qtip="Последняя страница"
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
