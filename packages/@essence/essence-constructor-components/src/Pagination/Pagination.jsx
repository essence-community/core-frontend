// @flow
import * as React from "react";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {IconButton, Typography} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";

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

class Pagination extends React.Component<Props & WithT> {
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

    // eslint-disable-next-line max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {classes = {}, count, page, rowsPerPage, gridBc, disabled, t} = this.props;
        const pages = Math.ceil(this.props.count / this.props.rowsPerPage);

        return (
            <div className={classes.root}>
                <IconButton
                    data-qtip={t("23264e86a9cd446f83cee0eb86c20bd9")}
                    color="primary"
                    onClick={this.handleFirstPageButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page === 0}
                    aria-label="First Page"
                    disableRipple
                    data-page-object={`${gridBc[VAR_RECORD_PAGE_OBJECT_ID]}-first-page`}
                >
                    <Icon iconfont="angle-double-left" />
                </IconButton>
                <IconButton
                    data-qtip={t("267e96bb282843abaa25b3e78bd874f1")}
                    color="primary"
                    onClick={this.handleBackButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page === 0}
                    aria-label="Previous Page"
                    data-page-object={`${gridBc[VAR_RECORD_PAGE_OBJECT_ID]}-previous-page`}
                    disableRipple
                >
                    <Icon iconfont="angle-left" />
                </IconButton>
                <Typography
                    variant="body2"
                    classes={{root: classes.typoRoot}}
                    data-page-object={`${gridBc[VAR_RECORD_PAGE_OBJECT_ID]}-current-page`}
                >
                    {t("3dd42493c346447897d017af3668d998", {
                        currentpage: pages > 0 ? this.props.page + 1 : 0,
                        pages,
                    })}
                </Typography>

                <IconButton
                    data-qtip={t("d4d9e481a0e14bbd9e1e76537e8cbfd0")}
                    color="primary"
                    onClick={this.handleNextButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                    data-page-object={`${gridBc[VAR_RECORD_PAGE_OBJECT_ID]}-next-page`}
                    disableRipple
                >
                    <Icon iconfont="angle-right" />
                </IconButton>
                <IconButton
                    data-qtip={t("d0f0a046dee344d1b5bbbadcd8d848db")}
                    color="primary"
                    onClick={this.handleLastPageButtonClick}
                    classes={{disabled: classes.disabledButton, root: classes.buttonRoot}}
                    disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                    data-page-object={`${gridBc[VAR_RECORD_PAGE_OBJECT_ID]}-last-page`}
                    disableRipple
                >
                    <Icon iconfont="angle-double-right" />
                </IconButton>
            </div>
        );
    }
}

export default compose(withTranslation("meta"), withStyles(styles))(Pagination);
