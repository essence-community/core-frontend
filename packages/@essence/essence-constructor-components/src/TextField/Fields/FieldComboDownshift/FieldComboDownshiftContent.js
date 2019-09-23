// @flow
import * as React from "react";
import findIndex from "lodash/findIndex";
import noop from "lodash/noop";
import {observer} from "mobx-react";
import {MenuItem, CircularProgress, Paper} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {isEqualStr, isEmpty} from "../../../utils/base";
import Scrollbars from "../../../Components/Scrollbars/Scrollbars";
import Pagination from "../../../Pagination/Pagination";
import {getExactSuggestions} from "./fieldComboDownshiftHelpers";
import {type PopupContentPropsType} from "./FieldComboDownshiftType";

const ITEM_HEIGHT = 35;
// 10 lines
const AUTO_HEIGHT_MAX = 350;

class FieldComboDownshiftContent extends React.Component<PopupContentPropsType> {
    scrollbars: ?Object;

    componentDidMount() {
        requestAnimationFrame(this.setFocuToSelectedElement);
        this.props.pageStore.addScrollEvent(this.handleScroll);
    }

    componentWillUnmount() {
        this.props.pageStore.removeScrollEvent(this.handleScroll);
    }

    setFocuToSelectedElement = () => {
        const {store, field, setHighlightedIndex, bc} = this.props;

        if (isEmpty(field.value)) {
            if (bc.allownew !== "true") {
                setHighlightedIndex(0);
            }
        } else {
            const rowIndex = findIndex(store.suggestions, (suggestion: Object) =>
                isEqualStr(suggestion.value, field.value),
            );

            if (rowIndex >= 0 && this.scrollbars) {
                this.scrollbars.scrollTop(rowIndex * ITEM_HEIGHT);
                setHighlightedIndex(rowIndex);
            }
        }
    };

    setScrollbarsRef = (scrollbars: ?Object) => {
        this.scrollbars = scrollbars;
    };

    handleScroll = () => {
        this.props.pageStore.removeScrollEvent(this.handleScroll);
        this.props.toggleMenu();
    };

    handleContentWheel = (event) => {
        event.stopPropagation();
    };

    render() {
        const {
            store,
            classes = {},
            bc: {querymode, ckPageObject},
            getItemProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            field,
        } = this.props;
        const {isLoading} = store.recordsStore;
        const autoHeightMin = store.recordsStore.pageSize
            ? Math.min(store.recordsStore.pageSize * ITEM_HEIGHT, AUTO_HEIGHT_MAX)
            : undefined;

        return (
            <Paper className={classes.paper} square data-page-object={`${ckPageObject}-window`}>
                <Scrollbars
                    autoHeight
                    hideTracksWhenNotNeeded
                    autoHeightMin={autoHeightMin}
                    autoHeightMax={AUTO_HEIGHT_MAX}
                    scrollbarsRef={this.setScrollbarsRef}
                    onWheel={this.handleContentWheel}
                >
                    {isLoading ? (
                        <CircularProgress
                            classes={{root: classes.loader}}
                            data-page-object={`${ckPageObject}-progress`}
                        />
                    ) : (
                        getExactSuggestions({
                            allowFilter: store.allowFilter,
                            displayText: store.displayText,
                            inputValue,
                            querymode,
                            selectedItem,
                            suggestions: store.suggestions,
                        }).map((suggestion, index) => {
                            const isSelectedValue = isEqualStr(suggestion.value, field.value);

                            return (
                                <MenuItem
                                    key={suggestion.value}
                                    {...getItemProps({
                                        index,
                                        item: suggestion.value,
                                    })}
                                    selected={highlightedIndex === index}
                                    component="div"
                                    classes={{root: classes.menuItem}}
                                    disableRipple
                                    data-page-object={`${ckPageObject}-item-${String(suggestion.value)}`}
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
                    {isLoading ? <MenuItem disableRipple classes={{root: classes.paginationMenuItem}} /> : null}
                </Scrollbars>
                {store.recordsStore.pageSize ? (
                    <MenuItem
                        component="div"
                        {...getItemProps({
                            item: "paginationBar",
                            onClick(event) {
                                event.nativeEvent.preventDownshiftDefault = true;
                            },
                        })}
                        disableRipple
                        classes={{root: classes.paginationMenuItem}}
                    >
                        <Pagination
                            gridBc={this.props.bc}
                            component="div"
                            count={store.recordsStore.recordsCount}
                            rowsPerPage={store.recordsStore.pageSize}
                            rowsPerPageOptions={[store.recordsStore.pageSize]}
                            page={store.recordsStore.pageNumber}
                            onChangePage={store.recordsStore.setPageNumberAction}
                            onChangeRowsPerPage={noop}
                            Actions={Pagination}
                        />
                    </MenuItem>
                ) : null}
            </Paper>
        );
    }
}

export default observer(FieldComboDownshiftContent);
