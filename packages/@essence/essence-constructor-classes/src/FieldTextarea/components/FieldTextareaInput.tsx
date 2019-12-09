import * as React from "react";
import {TextareaAutosize} from "@material-ui/core";
import {Scrollbars, VerticalResizer} from "@essence/essence-constructor-share/uicomponents";
import {useStyles} from "./FieldTextareaInput.styles";
import {IFieldTextareaInputProps} from "./FieldTextareaInput.types";

const MIN_INPUT_HEIGHT = 17;

export const FieldTextareaInput: React.FC<IFieldTextareaInputProps> = (props) => {
    const scrollbarsRef: React.MutableRefObject<any> = React.useRef(null);
    const {height, onChangeHeight, bc, editing, inputRef, ...otherProps} = props;
    const minHeight = React.useMemo(() => (bc.minheight ? parseInt(bc.minheight, 10) : MIN_INPUT_HEIGHT), [
        bc.minheight,
    ]);
    const maxHeight = React.useMemo(() => (bc.maxheight ? parseInt(bc.maxheight, 10) : undefined), [bc.maxheight]);
    const classes = useStyles(props);

    const handleFocus = (event: React.MouseEvent<ReactCustomScrollbars.Scrollbars, MouseEvent>) => {
        // @ts-ignore
        const textArea = event.currentTarget.querySelector("textarea");

        if (textArea) {
            textArea.focus();
        }
    };

    const handleInitialHeight = React.useCallback(() => {
        if (scrollbarsRef.current) {
            return scrollbarsRef.current.view.querySelector("textarea").offsetHeight;
        }

        return 0;
    }, []);

    return (
        <React.Fragment>
            <Scrollbars
                autoHeight
                autoHeightMax={maxHeight && !height ? maxHeight : height}
                autoHeightMin={minHeight && !height ? minHeight : height}
                hideHorizontalScrollbar
                style={{marginTop: 11}}
                onClick={handleFocus}
                // @ts-ignore
                scrollbarsRef={scrollbarsRef}
            >
                <TextareaAutosize {...otherProps} ref={inputRef} />
            </Scrollbars>
            {editing ? (
                <div className={classes.resizerWrapper}>
                    <VerticalResizer
                        height={height}
                        minHeight={minHeight}
                        maxHeight={maxHeight}
                        onChangeHeight={onChangeHeight}
                        className={classes.resizer}
                        getInitialHeight={handleInitialHeight}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
};
