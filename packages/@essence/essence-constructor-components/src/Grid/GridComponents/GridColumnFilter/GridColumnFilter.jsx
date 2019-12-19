// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import pick from "lodash/pick";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence/essence-constructor-share/constants";
import Popover from "../../../Popover/Popover";
import GridColumnFilterFields from "../GridColumnFilterFields/GridColumnFilterFields";
import {type GridModelType} from "../../../stores/GridModel";
import {type PageModelType} from "../../../stores/PageModel";
import styles from "./GridColumnFilterStyles";

type PropsType = {|
    bc: Object,
    store: GridModelType,
    classes: Object,
    disabled?: boolean,
    className: string,
    filterResetCount: number,
    pageStore: PageModelType,
    visible: boolean,
|};

const anchorOrigin = {
    horizontal: "left",
    vertical: "bottom",
};

const transformOrigin = {
    horizontal: "left",
    vertical: "top",
};

const filterAttrs = ["datatype", "column", "format", "displayfield", "valuefield", VAR_RECORD_DISPLAYED];

class GridColumnFilter extends React.Component<PropsType> {
    static defaultProps = {
        className: "",
        classes: {},
    };

    bc: Object;

    column: string;

    constructor(props: PropsType) {
        super(props);

        this.column = props.bc.column;
        this.bc = {
            ...pick(props.bc, filterAttrs),
            [VAR_RECORD_PAGE_OBJECT_ID]: `${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}Filter`,
        };
    }

    renderIcon = (isFilled: boolean) => ({open, onOpen}) => {
        const {classes, disabled} = this.props;
        const className = cn(classes.popoverWrapper, {
            [this.props.className]: !disabled,
            [classes.popoverWrapperFilled]: isFilled,
            [classes.popoverWrapperDisabled]: disabled,
            [classes.popoverWrapperOpen]: open,
        });

        return (
            <div className={className} onClick={onOpen}>
                <Icon iconfont="caret-down" size="xs" />
            </div>
        );
    };

    renderPopover = ({isFilled, fieldContent}) => {
        const {store, classes, pageStore} = this.props;

        const popoverContent = (
            <Grid container className={classes.content} wrap="nowrap">
                <Grid item>
                    <Icon iconfont="search" className={classes.contentSearch} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    {fieldContent}
                </Grid>
            </Grid>
        );

        return (
            <Popover
                container={store.pageStore.pageEl}
                popoverContent={popoverContent}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                width={250}
                focusableMount
                pageStore={pageStore}
                hideOnScroll
            >
                {this.renderIcon(isFilled)}
            </Popover>
        );
    };

    render() {
        const {pageStore, visible} = this.props;

        if (this.bc.datatype === "boolean" || this.bc.datatype === "checkbox") {
            return null;
        }

        return (
            <GridColumnFilterFields
                bc={this.bc}
                editing={true}
                pageStore={pageStore}
                visible={visible}
                renderPopover={this.renderPopover}
            />
        );
    }
}

export default compose(withStyles(styles), observer)(GridColumnFilter);
