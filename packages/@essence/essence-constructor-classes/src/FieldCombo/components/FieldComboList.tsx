import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {Paper, MenuItem, CircularProgress} from "@material-ui/core";
import {Icon, IBuilderConfig, Scrollbars, Pagination} from "@essence/essence-constructor-share";
import {ISuggestion} from "../store/FieldComboModel.types";
import {FieldComboModel} from "../store/FieldComboModel";
import {useStyles} from "./FieldComboList.styles";

const ITEM_HEIGHT = 35;
// 10 lines
const AUTO_HEIGHT_MAX = 350;

const handleContentWheel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
};

interface IProps {
    store: FieldComboModel;
    bc: IBuilderConfig;
    value?: never;
    onChange: (event: React.SyntheticEvent | null, value: string) => void;
}

export const FieldComboList: React.FC<IProps> = (props) => {
    const {store, bc} = props;
    const stringValue = String(props.value);
    const classes = useStyles(props);
    const autoHeightMin = store.recordsStore.pageSize
        ? Math.min(store.recordsStore.pageSize * ITEM_HEIGHT, AUTO_HEIGHT_MAX)
        : undefined;
    const handleSelect = (suggestion: ISuggestion) => () => {
        props.onChange(null, suggestion.value);
    };

    return useObserver(() => (
        <Paper className={classes.paper} square data-page-object={`${bc.ckPageObject}-window`}>
            <Scrollbars
                autoHeight
                hideTracksWhenNotNeeded
                autoHeightMin={autoHeightMin}
                autoHeightMax={AUTO_HEIGHT_MAX}
                onWheel={handleContentWheel}
            >
                {store.recordsStore.isLoading ? (
                    <CircularProgress
                        classes={{root: classes.loader}}
                        data-page-object={`${bc.ckPageObject}-progress`}
                    />
                ) : (
                    store.suggestions.map((suggestion) => {
                        const isSelectedValue = suggestion.value === stringValue;

                        return (
                            <MenuItem
                                key={suggestion.value}
                                component="div"
                                classes={{root: classes.menuItem}}
                                disableRipple
                                onClick={handleSelect(suggestion)}
                                selected={isSelectedValue}
                                data-page-object={`${bc.ckPageObject}-item-${String(suggestion.value)}`}
                                data-qtip={suggestion.label}
                            >
                                <span
                                    className={`${classes.menuItemLabel} ${
                                        isSelectedValue ? classes.menuItemSelectedLabel : ""
                                    }`}
                                >
                                    {suggestion.label}
                                </span>
                                {isSelectedValue ? (
                                    <span className={classes.menuItemSelectedCheck}>
                                        <Icon iconfontname="mdi" iconfont="check" />
                                    </span>
                                ) : null}
                            </MenuItem>
                        );
                    })
                )}
                {store.recordsStore.isLoading ? (
                    <MenuItem disableRipple classes={{root: classes.paginationMenuItem}} />
                ) : null}
            </Scrollbars>
            {store.recordsStore.pageSize ? (
                <MenuItem component="div" disableRipple classes={{root: classes.paginationMenuItem}}>
                    <Pagination
                        count={store.recordsStore.recordsCount}
                        rowsPerPage={store.recordsStore.pageSize}
                        page={store.recordsStore.pageNumber}
                        onChangePage={store.recordsStore.setPageNumberAction}
                        ckPageObject={bc.ckPageObject}
                    />
                </MenuItem>
            ) : null}
        </Paper>
    ));
};
