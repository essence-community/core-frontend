import * as React from "react";
import {useObserver, useDisposable} from "mobx-react-lite";
import {Paper, MenuItem, CircularProgress} from "@material-ui/core";
import {IBuilderConfig, Scrollbars, Pagination, FieldValue, toString} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IPopoverChildrenProps} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {reaction} from "mobx";
import {ISuggestion} from "../store/FieldComboModel.types";
import {FieldComboModel} from "../store/FieldComboModel";
import {useStyles} from "./FieldComboList.styles";
import {FieldComboListItem} from "./FieldComboListItem";

const ITEM_HEIGHT = 35;
// 10 lines
const AUTO_HEIGHT_MAX = 350;

const handleContentWheel = (event: React.WheelEvent<any>) => {
    event.stopPropagation();
};

interface IProps extends IPopoverChildrenProps {
    store: FieldComboModel;
    bc: IBuilderConfig;
    value?: FieldValue;
    inputRef: React.RefObject<HTMLInputElement>;
    listRef: React.MutableRefObject<HTMLInputElement | null>;
    onChange: (event: React.SyntheticEvent | null, value: string) => void;
}

export const FieldComboList: React.FC<IProps> = (props) => {
    const {store, bc, onChange, onClose, listRef, onCalculateOffset, height} = props;
    const scrollbarRef: React.MutableRefObject<Scrollbars | undefined> = React.useRef();
    const stringValue = toString(props.value);
    const classes = useStyles(props);
    const autoHeightMin = store.recordsStore.pageSize
        ? Math.min(store.recordsStore.pageSize * ITEM_HEIGHT, AUTO_HEIGHT_MAX)
        : undefined;
    const handleSelect = React.useCallback(
        (event: React.SyntheticEvent, suggestion: ISuggestion) => {
            onChange(null, suggestion.isNew ? `${bc.allownew}${suggestion.value}` : suggestion.value);
            onClose(event);

            if (bc.allownew) {
                store.handleSetValue(suggestion.value, false, false);
            }

            if (props.inputRef.current) {
                props.inputRef.current.focus();
            }
        },
        [bc.allownew, onChange, onClose, props.inputRef, store],
    );

    React.useEffect(() => {
        if (store.highlightedIndex >= 0 && scrollbarRef.current) {
            // @ts-ignore
            scrollbarRef.current.scrollTop(store.highlightedIndex * ITEM_HEIGHT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useDisposable(
        () =>
            reaction(
                () => props.store.highlightedIndex,
                (highlightedIndex) => {
                    if (highlightedIndex >= 0 && scrollbarRef.current) {
                        // @ts-ignore
                        scrollbarRef.current.scrollTop(highlightedIndex * ITEM_HEIGHT);
                    }
                },
            ),
        [],
    );

    React.useEffect(() => {
        onCalculateOffset();
    });

    return useObserver(() => (
        <Paper
            className={classes.paper}
            square
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-window`}
            ref={listRef}
        >
            <Scrollbars
                autoHeight
                hideTracksWhenNotNeeded
                autoHeightMin={autoHeightMin}
                autoHeightMax={height || AUTO_HEIGHT_MAX}
                onWheel={handleContentWheel}
                // @ts-ignore
                scrollbarsRef={scrollbarRef}
            >
                {store.recordsStore.isLoading ? (
                    <CircularProgress
                        classes={{root: classes.loader}}
                        data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-progress`}
                    />
                ) : (
                    store.suggestions.map((suggestion) => {
                        const isSelectedValue = suggestion.value === stringValue;
                        const isHighlightedValue = suggestion.value === props.store.highlightedValue;

                        return (
                            <FieldComboListItem
                                key={`${suggestion.value}-${suggestion.label}`}
                                suggestion={suggestion}
                                onSelect={handleSelect}
                                isSelectedValue={isSelectedValue}
                                isHighlightedValue={isHighlightedValue}
                                ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                            />
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
                        ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                    />
                </MenuItem>
            ) : null}
        </Paper>
    ));
};
