// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {Icon} from "@essence/essence-constructor-share/Icon";

const styles = (theme: any) => ({
    buttonRoot: {
        color: theme.palette.primary.main,
        height: theme.sizing.gridRowHeight,
        width: theme.sizing.gridRowHeight,
    },
    disabledButton: {
        color: theme.palette.grey.arrow,
    },
    root: {
        display: "flex",
    },
    typoRoot: {
        alignItems: "center",
        display: "flex",
        fontSize: 16,
        margin: "0 5px",
    },
});

type Props = {
    classes?: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    disabled?: boolean,
    onChangePage: (pageNumber: number) => void,
    page: number,
    count: number,
    rowsPerPage: number,
    gridBc: Object,
};

class Pagination extends React.Component<Props> {
    static defaultProps = {
        gridBc: {},
    };

    handleFirstPageButtonClick = () => {
        this.props.onChangePage(0);
    };

    handleBackButtonClick = () => {
        this.props.onChangePage(this.props.page - 1);
    };

    handleNextButtonClick = () => {
        this.props.onChangePage(this.props.page + 1);
    };

    handleLastPageButtonClick = () => {
        this.props.onChangePage(Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    };

    render() {
        const {classes = {}, count, page, rowsPerPage, gridBc, disabled} = this.props;
        const pages = Math.ceil(this.props.count / this.props.rowsPerPage);

        return (
            <div className={classes.root}>
                <IconButton
                    data-qtip="Первая страница"
                    color="primary"
                    onClick={this.handleFirstPageButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page === 0}
                    aria-label="First Page"
                    disableRipple
                    data-page-object={`${gridBc.ckPageObject}-first-page`}
                >
                    <Icon iconfont="angle-double-left" />
                </IconButton>
                <IconButton
                    data-qtip="Предыдущая страница"
                    color="primary"
                    onClick={this.handleBackButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page === 0}
                    aria-label="Previous Page"
                    data-page-object={`${gridBc.ckPageObject}-previous-page`}
                    disableRipple
                >
                    <Icon iconfont="angle-left" />
                </IconButton>
                <Typography classes={{root: classes.typoRoot}} data-page-object={`${gridBc.ckPageObject}-current-page`}>
                    {pages > 0 ? this.props.page + 1 : 0} из {pages}
                </Typography>

                <IconButton
                    data-qtip="Следующая страница"
                    color="primary"
                    onClick={this.handleNextButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                    data-page-object={`${gridBc.ckPageObject}-next-page`}
                    disableRipple
                >
                    <Icon iconfont="angle-right" />
                </IconButton>
                <IconButton
                    data-qtip="Последняя страница"
                    color="primary"
                    onClick={this.handleLastPageButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                    data-page-object={`${gridBc.ckPageObject}-last-page`}
                    disableRipple
                >
                    <Icon iconfont="angle-double-right" />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(Pagination);
