import * as React from "react";
import {TextareaAutosize} from "@material-ui/core";
import {Scrollbars, VerticalResizer} from "@essence/essence-constructor-share/uicomponents";
import {useStyles} from "./FieldTextareaInput.styles";
import {IFieldTextareaInputProps} from "./FieldTextareaInput.typs";

const MIN_INPUT_HEIGHT = 17;

export const FieldTextareaInput: React.FC<IFieldTextareaInputProps> = (props) => {
    const classes = useStyles(props);
    const {height, onChangeHeight, bc, editing, ...otherProps} = props;
    const inputRef: React.MutableRefObject<null | HTMLTextAreaElement> = React.useRef(null);
    const minHeight = React.useMemo(() => (bc.minheight ? parseInt(bc.minheight, 10) : MIN_INPUT_HEIGHT), [
        bc.minheight,
    ]);
    const maxHeight = React.useMemo(() => (bc.maxheight ? parseInt(bc.maxheight, 10) : undefined), [bc.maxheight]);

    const handleFocus = (event: React.MouseEvent<ReactCustomScrollbars.Scrollbars, MouseEvent>) => {
        // @ts-ignore
        const textArea = event.currentTarget.querySelector("textarea");

        if (textArea) {
            textArea.focus();
        }
    };

    const handleInitialHeight = React.useCallback(() => {
        if (inputRef.current) {
            return inputRef.current.offsetHeight;
        }

        return 0;
    }, []);

    return (
        <React.Fragment>
            <Scrollbars
                autoHeight
                autoHeightMax={maxHeight && !height ? maxHeight : height}
                autoHeightMin={minHeight && !height ? minHeight : height}
                style={{marginTop: 11}}
                onClick={handleFocus}
            >
                <TextareaAutosize {...otherProps} />
            </Scrollbars>
            {editing ? (
                <VerticalResizer
                    height={height}
                    minHeight={minHeight}
                    maxHeight={maxHeight}
                    onChangeHeight={onChangeHeight}
                    className={classes.resizer}
                    getInitialHeight={handleInitialHeight}
                />
            ) : null}
        </React.Fragment>
    );
};
